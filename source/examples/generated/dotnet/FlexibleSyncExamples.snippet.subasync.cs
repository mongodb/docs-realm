var query = realm.All<Team>().Where(t => t.Name == "MyTeam");
await query.SubscribeAsync();

// you can also pass a SubscriptionOptions object:
await query.SubscribeAsync(
    new SubscriptionOptions() { Name = "teamSubscription" });
