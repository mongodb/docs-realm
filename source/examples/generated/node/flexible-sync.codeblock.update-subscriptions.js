subscriptions.update((mutableSubscriptionsInstance) => {
  mutableSubscriptionsInstance.add(
    tasks.filtered('status == "completed" && progressMinutes > 180'),
    {
      name: "longRunningTasksSubscription",
    }
  );
});
