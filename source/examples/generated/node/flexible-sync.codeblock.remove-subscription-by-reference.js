let subscriptionReference;
subscriptions.update((mutableSubscriptionsInstance) => {
  subscriptionReference = mutableSubscriptionsInstance.add(
    realm.objects("Task")
  );
});

// later..
subscriptions.removeSubscription(subscriptionReference);
