subscriptions.update((mutableSubscriptionsInstance) => {
  mutableSubscriptionsInstance.add(longRunningTasks, {
    name: "longRunningTasksSubscription",
  });
  mutableSubscriptionsInstance.add(bensTasks);
  mutableSubscriptionsInstance.add(realm.objects("Team"), {
    name: "teamsSubscription",
    throwOnUpdate: true,
  });
});
