let sub1, sub2, sub3;
subscriptions.update((mutableSubscriptionsInstance) => {
  sub1 = mutableSubscriptionsInstance.add(longRunningTasks, {
    name: "longRunningTasksSubscription",
  });
  sub2 = mutableSubscriptionsInstance.add(bensTasks);
  sub3 = mutableSubscriptionsInstance.add(realm.objects("Team"), {
    name: "teamsSubscription",
    throwOnUpdate: true,
  });
});
