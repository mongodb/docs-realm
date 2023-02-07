#include <catch2/catch_test_macros.hpp>
#include <string>
#include <thread>
#include <future>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "FlexibleSync_": ""
//   }
// }

static std::string APP_ID = "cpp-tester-uliix";

struct FlexibleSync_Dog : realm::object<FlexibleSync_Dog> {
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("FlexibleSync_Dog",
        realm::property<&FlexibleSync_Dog::_id, true>("_id"),
        realm::property<&FlexibleSync_Dog::name>("name"),
        realm::property<&FlexibleSync_Dog::age>("age"));
};

TEST_CASE("subscribe to a all objects of a type", "[sync]") {
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    auto syncConfig = user.flexible_sync_configuration();
    auto syncedRealmRef = realm::async_open<FlexibleSync_Dog>(syncConfig).get_future().get();
    auto syncedRealm = syncedRealmRef.resolve();
    auto clearInitialSubscriptions = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get_future().get();
    CHECK(clearInitialSubscriptions == true);
    CHECK(syncedRealm.subscriptions().size() == 0);
    // :snippet-start: subscribe-to-all-objects-of-a-type
    auto updateSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.add<FlexibleSync_Dog>("dogs");
    }).get_future().get();
    // The .update() function returns a bool, which confirms whether or not the update succeeded
    REQUIRE(updateSubscriptionSuccess == true);
    // You can check the .size() of the subscription set, which tells you the 
    // number of sync_subscription objects in the set
    CHECK(syncedRealm.subscriptions().size() == 1);
    // :snippet-end:
    // :snippet-start: remove-subscription-by-name
    auto removeSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.remove("dogs");
    }).get_future().get();
    REQUIRE(removeSubscriptionSuccess == true);
    // :snippet-end:
    CHECK(syncedRealm.subscriptions().size() == 0);
    // :snippet-start: refresh-the-realm
    syncedRealm.refresh();
    // :snippet-end:
}

TEST_CASE("subscribe to a subset of objects", "[sync]") {
    // :snippet-start: flexible-sync-prerequisites
    // Initialize the App, authenticate a user, and open the realm
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    auto syncConfig = user.flexible_sync_configuration();
    auto syncedRealmRef = realm::async_open<FlexibleSync_Dog>(syncConfig).get_future().get();
    auto syncedRealm = syncedRealmRef.resolve();
    // :snippet-end:
    // :snippet-start: clear-all-subscriptions
    // You can use .clear() inside a mutable_sync_subscription_set to clear all 
    // sync_subscription objects from the set 
    auto updateSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get_future().get();
    CHECK(updateSubscriptionSuccess == true);
    CHECK(syncedRealm.subscriptions().size() == 0);
    // :snippet-end:
    // :snippet-start: subscribe-to-objects-matching-a-query
    updateSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.add<FlexibleSync_Dog>("puppies", [](auto &obj) {
            return obj.age < 3;
        });
    }).get_future().get();
    REQUIRE(updateSubscriptionSuccess == true);
    CHECK(syncedRealm.subscriptions().size() == 1);
    // :snippet-end:
    // :snippet-start: subscription-count-and-find-subscription
    // Check the subscription count
    CHECK(syncedRealm.subscriptions().size() == 1);

    // Find a specific subscription by name
    auto puppySubscription = *syncedRealm.subscriptions().find("puppies");
    CHECK(puppySubscription.name == "puppies"); // :remove:

    // Get information about the subscription
    CHECK(puppySubscription.object_class_name == "FlexibleSync_Dog");
    CHECK(puppySubscription.query_string == "age < 3");
    // :snippet-end:
    // :snippet-start: change-subscription-query
    updateSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.update_subscription<FlexibleSync_Dog>("puppies", [](auto &obj) {
            // Change the age filter from `age < 3` to `age < 2`
            return obj.age < 2;
        });
    }).get_future().get();
    REQUIRE(updateSubscriptionSuccess == true);
    // :snippet-end:
    auto updatedPuppySubscription = *syncedRealm.subscriptions().find("puppies");
    CHECK(updatedPuppySubscription.query_string == "age < 2");
}
// :replace-end:
