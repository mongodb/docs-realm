await realm.subscriptions.update((mutableSubs) => {
  mutableSubs.add(longRunningTasks, {
    name: "longRunningTasksSubscription",
  });
  mutableSubs.add(bensTasks);
  mutableSubs.add(realm.objects("Team"), {
    name: "teamsSubscription",
    throwOnUpdate: true,
  });
});
