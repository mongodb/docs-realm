realm.subscriptions.update(({ removeByName }) => {
  // remove a subscription with a specific name
  removeByName("longRunningTasksSubscription");
});
