subscriptions.update((mutableSubscriptionsInstance) => {
  // remove a subscription with a specific name
  mutableSubscriptionsInstance.removeByName("longRunningTasksSubscription");
});
