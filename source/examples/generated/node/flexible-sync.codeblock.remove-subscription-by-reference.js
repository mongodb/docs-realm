let subscriptionReference;
subscriptions.update(({ add }) => {
  subscriptionReference = add(realm.objects("Task"));
});
// later..
subscriptions.removeSubscription(subscriptionReference);
