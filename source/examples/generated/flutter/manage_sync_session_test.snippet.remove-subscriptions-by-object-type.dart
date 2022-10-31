Subscription sub = realm.subscriptions[0];
realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.removeByType<Train>();
});
