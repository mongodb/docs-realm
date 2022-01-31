realm.Subscriptions.Update(() =>
{
    var updatedLongRunningTasksQuery = realm.All<Task>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
    subscriptions.Add(updatedLongRunningTasksQuery, new() { Name = "longRunningTasks" });
});
