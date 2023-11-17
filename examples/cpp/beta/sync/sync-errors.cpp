#include <catch2/catch_test_macros.hpp>
#include <future>
#include <cpprealm/sdk.hpp>
#include <unistd.h>
#include <cpprealm/experimental/sdk.hpp>
#include <string>

// :replace-start: {
//   "terms": {
//     "SyncError_": "",
//     "Beta_SyncError_": ""
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

// :snippet-start: compensating-write-model
struct Beta_SyncError_Item {
    primary_key<realm::object_id> _id{realm::object_id::generate()};
    std::string ownerId;
    std::string itemName;
    int64_t complexity;
};
REALM_SCHEMA(Beta_SyncError_Item, _id, ownerId, itemName, complexity)
// :snippet-end:

TEST_CASE("set a sync error handler", "[error]") {
    // :snippet-start: create-error-handler
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();

    // Setting an error handler on the sync_config gives you access to sync_session and sync_error
    dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::internal::bridge::sync_error& error) {
        std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
    });

    auto syncRealmRef = realm::async_open<SyncError_Dog>(dbConfig).get_future().get();
    auto syncRealm = syncRealmRef.resolve();
    // :snippet-end:
    auto syncSession = syncRealm.get_sync_session();
    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    syncSession->wait_for_upload_completion().get();
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
    syncSession->wait_for_upload_completion().get();
}

TEST_CASE("beta set a sync error handler", "[error]") {
    // :snippet-start: beta-create-error-handler
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();

    // Setting an error handler on the sync_config gives you access to sync_session and sync_error
    dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::internal::bridge::sync_error& error) {
        std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
    });

    auto syncRealm = realm::experimental::db(dbConfig);
    // :snippet-end:
    auto syncSession = syncRealm.get_sync_session();
    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    syncSession->wait_for_upload_completion().get();
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
    syncSession->wait_for_upload_completion().get();
}

TEST_CASE("beta compensating write error outside query", "[error]") {
    // :snippet-start: compensating-write-setup
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();
    // :remove-start:
    realm::object_id primaryKey = { realm::object_id::generate() };

    std::promise<realm::internal::bridge::sync_error> errorPromise;
    std::future<realm::internal::bridge::sync_error> future = errorPromise.get_future();
    
    dbConfig.sync_config().set_error_handler([&](const realm::sync_session& session, std::optional<realm::internal::bridge::sync_error> error) {
        std::cerr << "A sync error occurred. Message: " << error->message() << std::endl;
        errorPromise.set_value(*error); // :remove:
    });
    // :remove-end:
    auto syncRealm = realm::experimental::db(dbConfig);
    // :remove-start:
    auto syncSession = syncRealm.get_sync_session();
    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    syncSession->wait_for_upload_completion().get();
    // :remove-end:
    // Add subscription
    auto subscriptionUpdateSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        // Get Items from Atlas that match this query.
        // Uses the queryable field `complexity`.
        // Sync Item objects with complexity less than or equal to 4.
        subs.add<Beta_SyncError_Item>("simple items", [](auto &obj) {
            return obj.complexity <= 4;
        });
    }).get();
    // :snippet-end:
    REQUIRE(subscriptionUpdateSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 1);

    // :snippet-start: successful-write-example
    // Per the Device Sync permissions, users can only read and write data
    // where the `Item.ownerId` property matches their own user ID.
    auto simpleItem = Beta_SyncError_Item {
        .ownerId = user.identifier(),
        .itemName = "This item meets sync criteria",
        .complexity = 3
    };

    // `simpleItem` successfully writes to the realm and syncs to Atlas
    // because its data matches the subscription query (complexity <= 4)
    // and its `ownerId` field matches the user ID.
    syncRealm.write([&] {
        syncRealm.add(std::move(simpleItem));
    });
    // :snippet-end:
    
    auto syncedItems = syncRealm.objects<Beta_SyncError_Item>();
    CHECK(syncedItems.size() == 1);
    auto specificItem = syncedItems[0];
    syncRealm.write([&] {
        syncRealm.remove(specificItem);
    });
    syncSession->wait_for_upload_completion().get();
    
    // :snippet-start: compensating-write-example
    // The complexity of this item is `7`. This is outside the bounds
    // of the subscription query, which triggers a compensating write.
    auto complexItem = Beta_SyncError_Item {
        ._id = primaryKey,
        .ownerId = user.identifier(),
        .itemName = "Test compensating writes",
        .complexity = 7
    };

    // This should trigger a compensating write error when it tries to sync
    // due to server-side permissions, which gets logged with the error handler.
    syncRealm.write([&] {
        syncRealm.add(std::move(complexItem));
    });
    // :snippet-end:
    syncSession->wait_for_upload_completion().get();
    
    std::string pkString = primaryKey.to_string();
    auto receivedSyncError = future.get();
    // :snippet-start: get-compensating-write-error-info
    auto info = receivedSyncError.compensating_writes_info();
    for (auto& v : info) {
        std::cout << "A write was rejected with a compensating write error.\n";
        std::cout << "An object of type " << v.object_name << "\n";
        std::cout << "was rejected because " << v.reason << ".\n";
        // :remove-start:
        REQUIRE(v.primary_key == realm::object_id(primaryKey));
        REQUIRE(v.object_name == "Beta_SyncError_Item");
        REQUIRE(v.reason == "write to ObjectID(\"" + pkString + "\") in table \"Beta_SyncError_Item\" not allowed; object is outside of the current query view");
        // :remove-end:
    }
    // :snippet-end:
}

TEST_CASE("beta compensating write error write doesn't match permissions", "[error]") {
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto dbConfig = user.flexible_sync_configuration();
    realm::object_id primaryKey = { realm::object_id::generate() };

    std::promise<realm::internal::bridge::sync_error> errorPromise;
    std::future<realm::internal::bridge::sync_error> future = errorPromise.get_future();
    
    dbConfig.sync_config().set_error_handler([&](const realm::sync_session& session, std::optional<realm::internal::bridge::sync_error> error) {
        std::cerr << "A sync error occurred. Message: " << error->message() << std::endl;
        errorPromise.set_value(*error);
    });
    auto syncRealm = realm::experimental::db(dbConfig);
    auto syncSession = syncRealm.get_sync_session();
    auto updateSubscriptionSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 0);
    syncSession->wait_for_upload_completion().get();
    // Add subscription
    auto subscriptionUpdateSuccess = syncRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        // Get Items from Atlas that match this query.
        // Uses the queryable field `complexity`.
        // Sync Item objects with complexity less than or equal to 4.
        subs.add<Beta_SyncError_Item>("simple items", [](auto &obj) {
            return obj.complexity <= 4;
        });
    }).get();
    REQUIRE(subscriptionUpdateSuccess == true);
    CHECK(syncRealm.subscriptions().size() == 1);
    
    // :snippet-start: write-not-matching-permissions
    // The `ownerId` of this item does not match the user ID of the logged-in
    // user. The user does not have permissions to make this write, which
    // triggers a compensating write.
    auto itemWithWrongOwner = Beta_SyncError_Item {
        ._id = primaryKey, // :remove:
        .ownerId = "not the current user",
        .itemName = "Trigger an incorrect permissions compensating write",
        .complexity = 1
    };

    syncRealm.write([&] {
        syncRealm.add(std::move(itemWithWrongOwner));
    });
    // :snippet-end:
    syncSession->wait_for_upload_completion().get();
    
    std::string pkString = primaryKey.to_string();
    auto receivedSyncError = future.get();
    auto info = receivedSyncError.compensating_writes_info();
    for (auto& v : info) {
        std::cout << "A write was rejected with a compensating write error.\n";
        std::cout << "An object of type " << v.object_name << "\n";
        std::cout << "was rejected because " << v.reason << ".\n";
        // :remove-start:
        REQUIRE(v.primary_key == realm::object_id(primaryKey));
        REQUIRE(v.object_name == "Beta_SyncError_Item");
        REQUIRE(v.reason == "write to ObjectID(\"" + pkString + "\") in table \"Beta_SyncError_Item\" not allowed");
        // :remove-end:
    }
}
// :replace-end:
