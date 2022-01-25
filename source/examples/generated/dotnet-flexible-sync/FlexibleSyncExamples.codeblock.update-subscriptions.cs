subscriptions.Update(() =>
{
    // subscribe to all long running tasks, and give the subscription the name 'longRunningTasksSubscription'
    var longRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 120 ); 
    var longRunningTasksSubscriptionOptions = new SubscriptionOptions() { Name = "longRunningTasksSubscription" };
    var longRunningTasksSubscription = subscriptions.Add(longRunningTasksQuery, longRunningTasksSubscriptionOptions);

    // subscribe to all of Ben's Task objects
    var bensTasks = subscriptions.Add(realm.All<MyTask>().Where(t => t.Owner == "Ben"));

    // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
    var teamsSubscriptionOptions = new SubscriptionOptions() { Name = "teamsSubscription", UpdateExisting = false };
    var teamsSubscription = subscriptions.Add(realm.All<Team>(), teamsSubscriptionOptions); 
});
