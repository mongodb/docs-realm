realm.subscriptions.update(({ add }) => {
  add(tasks.filtered('status == "completed" && progressMinutes > 180'), {
    name: "longRunningTasksSubscription",
  });
});
