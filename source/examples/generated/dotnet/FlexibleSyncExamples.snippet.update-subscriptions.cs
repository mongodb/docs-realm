realm.Subscriptions.Update(() =>
{
    // subscribe to all long running items, and give the subscription the name 'longRunningItems'
    var longRunningItemsQuery = realm.All<Item>()
        .Where(t => t.Status == "completed" && t.ProgressMinutes > 120);
    realm.Subscriptions
        .Add(longRunningItemsQuery,
            new SubscriptionOptions() { Name = "longRunningItems" });

    // subscribe to all of Ben's Item objects
    realm.Subscriptions.Add(realm.All<Item>().Where(i => i.Owner == "Ben"));

    // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
    realm.Subscriptions.Add(realm.All<Team>(), new SubscriptionOptions() { Name = "teams", UpdateExisting = false });
});
