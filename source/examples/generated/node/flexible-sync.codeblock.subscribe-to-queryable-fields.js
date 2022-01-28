realm.subscriptions.update(({ add }) => {
  add(longRunningTasks, {
    name: "longRunningTasksSubscription",
  });

  add(bensTasks);

  add(realm.objects("Team"), {
    name: "teamsSubscription",
    throwOnUpdate: true,
  });
});

