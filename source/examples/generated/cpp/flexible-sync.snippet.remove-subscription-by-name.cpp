auto removeSubscriptionSuccess = syncedRealm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
    subs.remove("dogs");
}).get_future().get();
REQUIRE(removeSubscriptionSuccess == true);
