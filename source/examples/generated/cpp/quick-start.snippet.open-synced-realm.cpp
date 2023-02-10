auto sync_config = user.flexible_sync_configuration();
auto synced_realm_ref = realm::async_open<Todo>(sync_config).get_future().get();
auto realm = synced_realm_ref.resolve();
// For this example, get the userId for the Flexible Sync query
auto userId = user.identifier();
auto subscriptions = realm.subscriptions();
auto updateSubscriptionSuccess = subscriptions.update([&](realm::mutable_sync_subscription_set &subs) {
    subs.add<Todo>("todos", [&userId](auto &obj) {
        // For this example, get only Todo items where the ownerId
        // property value is equal to the userId of the logged-in user.
        return obj.ownerId == userId;
    });
}).get_future().get();
