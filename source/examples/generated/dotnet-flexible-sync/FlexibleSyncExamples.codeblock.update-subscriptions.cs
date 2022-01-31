realm.Subscriptions.Update(() =>
{
    // subscribe to all long running tasks, and give the subscription the name 'longRunningTasksSubscription'
    var longRunningTasksQuery = realm.All<Task>().Where(t => t.Status == "completed" && t.ProgressMinutes > 120 ); 
   subscriptions.Add(longRunningTasksQuery, new() { Name = "longRunningTasks" });

    // subscribe to all of Ben's Task objects
   subscriptions.Add(realm.All<Task>().Where(t => t.Owner == "Ben"));

    // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
    var teamsSubscriptionOptions = new SubscriptionOptions() { Name = "teamsSubscription", UpdateExisting = false };
    subscriptions.Add(realm.All<Team>(), new() { Name = "teams", UpdateExisting = false }); 
});
