var app = App.Create("myRealmAppId");
Realms.Sync.User user;
FlexibleSyncConfiguration config;
Realm realm;

if (app.CurrentUser == null)
{
    // App must be online for user to authenticate
    user = await app.LogInAsync(Credentials.Anonymous());

    config = new FlexibleSyncConfiguration(app.CurrentUser!);
    realm = await Realm.GetInstanceAsync(config);

    realm.Subscriptions.Update(() =>
    {
        // subscribe to all Task objects, and give the subscription the name 'allTasks'
        var allTasks = realm.All<MyTask>();
        realm.Subscriptions
            .Add(allTasks,
                new SubscriptionOptions() { Name = "allTasks" });
    });
}
else 
{
    // This works whether online or offline
    // It requires a user to have been previously authenticated
    // and assumes you have already added Flexible Sync subscriptions
    user = app.CurrentUser;
    config = new FlexibleSyncConfiguration(user);
    realm = Realm.GetInstance(config);
}
