#include <catch2/catch_test_macros.hpp>
#include <future>
#include <cpprealm/sdk.hpp>
#include <unistd.h>
#include <cpprealm/experimental/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "SyncError_": ""
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

using namespace realm::experimental;

struct SyncError_Dog : realm::object<SyncError_Dog> {
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("SyncError_Dog",
        realm::property<&SyncError_Dog::_id, true>("_id"),
        realm::property<&SyncError_Dog::name>("name"),
        realm::property<&SyncError_Dog::age>("age"));
};

struct Beta_SyncError_Dog {
    primary_key<realm::object_id> _id{realm::object_id::generate()};
    std::string name;
    int64_t age;
};
REALM_SCHEMA(Beta_SyncError_Dog, _id, name, age)

TEST_CASE("set a sync error handler", "[error]") {
    // :snippet-start: create-error-handler
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();

    // Setting an error handler on the sync_config gives you access to sync_session and sync_error
    dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::internal::bridge::sync_error& error) {
        std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
    });

    auto syncRealmRef = realm::async_open<SyncError_Dog>(dbConfig).get_future().get();
    auto syncRealm = syncRealmRef.resolve();
    // :snippet-end:

    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    sleep(5);
    updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.add<SyncError_Dog>("dogs");
    }).get();
    REQUIRE(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 1);

    auto dog = SyncError_Dog { .name = "Maui", .age = 4 };

    // This should trigger a compensating write error when it tries to sync
    // due to server-side permissions, which gets logged with the error handler.
    syncRealm.write([&syncRealm, &dog] {
        syncRealm.add(dog);
    });
    sleep(5);
}

TEST_CASE("beta set a sync error handler", "[error]") {
    // :snippet-start: beta-create-error-handler
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();

    // Setting an error handler on the sync_config gives you access to sync_session and sync_error
    dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::internal::bridge::sync_error& error) {
        std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
    });

    auto syncRealm = realm::experimental::db(dbConfig);
    // :snippet-end:

    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    sleep(5);
    updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.add<Beta_SyncError_Dog>("dogs");
    }).get();
    REQUIRE(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 1);

    auto dog = Beta_SyncError_Dog { .name = "Maui", .age = 4 };

    // This should trigger a compensating write error when it tries to sync
    // due to server-side permissions, which gets logged with the error handler.
    syncRealm.write([&] {
        syncRealm.add(std::move(dog));
    });
    sleep(5);
}
// :replace-end:
