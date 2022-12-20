realm.Subscriptions.Update(() =>
{
    var updatedLongRunningItemsQuery = realm.All<Item>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
    realm.Subscriptions.Add(updatedLongRunningItemsQuery, new SubscriptionOptions() { Name = "longRunningItems" });
});
