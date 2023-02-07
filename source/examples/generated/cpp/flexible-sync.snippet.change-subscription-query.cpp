updateSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
    subs.update_subscription<Dog>("puppies", [](auto &obj) {
        // Change the age filter from `age < 3` to `age < 2`
        return obj.age < 2;
    });
}).get_future().get();
REQUIRE(updateSubscriptionSuccess == true);
