realm.Subscriptions.Update(() =>
{
    var updatedLongRunningItemsQuery = realm
        .All<Item>()
        .Where(i => i.Status == "completed" && i.ProgressMinutes > 130);
    realm.Subscriptions
        .Add(updatedLongRunningItemsQuery,
            new SubscriptionOptions() { Name = "longRunningItems" });
});
