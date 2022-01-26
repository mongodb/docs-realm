subscriptions.update((mutableSubscriptionsInstance) => {
  // remove a subscription with a specific query
  mutableSubscriptionsInstance.remove(tasks.filtered('owner == "Ben"'));
});
