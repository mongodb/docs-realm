realm.Subscriptions.Update(() =>
{
    var updatedLongRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
    var longRunningTasksSubscriptionOptions = new SubscriptionOptions() { Name = "longRunningTasksSubscription" };
    var longRunningTasksSubscription = subscriptions.Add(updatedLongRunningTasksQuery, longRunningTasksSubscriptionOptions);
});
