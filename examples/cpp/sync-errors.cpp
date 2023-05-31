#include <catch2/catch_test_macros.hpp>
#include <future>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "SyncError_": ""
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

struct SyncError_Dog : realm::object<SyncError_Dog> {
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("SyncError_Dog",
        realm::property<&SyncError_Dog::_id, true>("_id"),
        realm::property<&SyncError_Dog::name>("name"),
        realm::property<&SyncError_Dog::age>("age"));
};

auto remove_sync_files() {
    auto relative_sync_files_path_directory = "mongodb-realm/";
    std::filesystem::path path = std::filesystem::current_path().append(relative_sync_files_path_directory);
    std::filesystem::remove_all(path);
}

TEST_CASE("set a sync error handler", "[error]") {
    // :snippet-start: create-error-handler
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    auto dbConfig = user.flexible_sync_configuration();

    // Setting an error handler on the sync_config gives you access to sync_session and sync_error
    dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::sync_error& error) {
        std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
    });

    auto syncRealmRef = realm::async_open<SyncError_Dog>(dbConfig).get_future().get();
    auto syncRealm = syncRealmRef.resolve();
    // :snippet-end:

    // When you run this test case with the following code independently, this
    // works as expected and invokes the error handler with:
    // A sync error occurred. Code: realm::sync::ProtocolError:231 Message: Client attempted a write that is outside of permissions or query filters; it has been reverted Logs: https://realm.mongodb.com/groups/5f60207f14dfb25d23101102/apps/6388f860cb722c5a5e002425/logs?co_id=641e14cedda6174a272ddbf4
    // When running it with [sync] tests, it fails - can't set the subscription.
    // auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
    //     subs.clear();
    // }).get_future().get();
    // CHECK(updateSubscriptionSuccess == true);
    // CHECK(syncRealm.subscriptions().size() == 0);
    // sleep(5);
    // updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
    //     subs.add<SyncError_Dog>("dogs");
    // }).get_future().get();
    // REQUIRE(updateSubscriptionSuccess == true);
    // CHECK(syncRealm.subscriptions().size() == 1);

    // auto dog = SyncError_Dog { .name = "Maui", .age = 4 };

    // This should trigger a compensating write error when it tries to sync 
    // due to server-side permissions, which gets logged with the error handler. 
    // syncRealm.write([&syncRealm, &dog] {
    //     syncRealm.add(dog);
    // });
    // sleep(5);
    // remove_sync_files();
}

// :replace-end:
