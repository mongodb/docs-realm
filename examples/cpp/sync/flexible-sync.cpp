#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <future>

// :replace-start: {
//   "terms": {
//     "FlexibleSync_": "",
//     "Beta_FlexibleSync_":"",
//     "Alpha_Sync_": ""
//   }
// }

using namespace realm;

static const std::string APP_ID = "cpp-tester-uliix";

struct Beta_FlexibleSync_Dog {
  primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Beta_FlexibleSync_Dog, _id, name, age)

TEST_CASE("beta subscribe to a all objects of a type", "[sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();
  auto syncedRealm = realm::db(syncConfig);
  auto clearInitialSubscriptions =
      syncedRealm.subscriptions()
          .update(
              [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
          .get();
  CHECK(clearInitialSubscriptions == true);
  CHECK(syncedRealm.subscriptions().size() == 0);
  // :snippet-start: subscribe-to-all-objects-of-a-type
  auto updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.add<Beta_FlexibleSync_Dog>("dogs");
          })
          .get();
  // The .update() function returns a bool, which confirms whether or not the
  // update succeeded
  REQUIRE(updateSubscriptionSuccess == true);
  // You can check the .size() of the subscription set, which tells you the
  // number of sync_subscription objects in the set
  CHECK(syncedRealm.subscriptions().size() == 1);
  // :snippet-end:
  // :snippet-start: remove-subscription-by-name
  auto removeSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.remove("dogs");
          })
          .get();
  REQUIRE(removeSubscriptionSuccess == true);
  // :snippet-end:
  CHECK(syncedRealm.subscriptions().size() == 0);
  // :snippet-start: refresh-the-realm
  syncedRealm.refresh();
  // :snippet-end:
}

TEST_CASE("beta subscribe to a subset of objects", "[sync]") {
  // :snippet-start: beta-flexible-sync-prerequisites
  // Initialize the App, authenticate a user, and open the realm
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();
  auto syncedRealm = realm::db(syncConfig);
  // :snippet-end:
  // :snippet-start: clear-all-subscriptions
  // You can use .clear() inside a mutable_sync_subscription_set to clear all
  // sync_subscription objects from the set
  auto updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update(
              [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
          .get();
  CHECK(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 0);
  // :snippet-end:
  // :snippet-start: subscribe-to-objects-matching-a-query
  updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.add<Beta_FlexibleSync_Dog>(
                "puppies", [](auto &obj) { return obj.age < 3; });
          })
          .get();
  REQUIRE(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 1);
  // :snippet-end:
  // :snippet-start: subscription-count-and-find-subscription
  // Check the subscription count
  CHECK(syncedRealm.subscriptions().size() == 1);

  // Find a specific subscription by name
  auto puppySubscription = *syncedRealm.subscriptions().find("puppies");
  CHECK(puppySubscription.name == "puppies");

  // Get information about the subscription
  CHECK(puppySubscription.object_class_name == "Beta_FlexibleSync_Dog");
  CHECK(puppySubscription.query_string == "age < 3");
  // :snippet-end:
  // :snippet-start: change-subscription-query
  updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.update_subscription<Beta_FlexibleSync_Dog>(
                "puppies", [](auto &obj) { return obj.age < 2; });
          })
          .get();
  REQUIRE(updateSubscriptionSuccess == true);
  // :snippet-end:
  auto updatedPuppySubscription = *syncedRealm.subscriptions().find("puppies");
  CHECK(updatedPuppySubscription.query_string == "age < 2");
}
// :replace-end:
