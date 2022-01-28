let subscriptionReference;
realm.subscriptions.update(({ add }) => {
  subscriptionReference = add(realm.objects("Task"));
});
// later..
realm.subscriptions.removeSubscription(subscriptionReference);
