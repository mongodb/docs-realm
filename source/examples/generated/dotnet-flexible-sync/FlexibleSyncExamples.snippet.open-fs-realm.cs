var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());

var config = new FlexibleSyncConfiguration(app.CurrentUser!)
{
    PopulateInitialSubscriptions = (realm) =>
    {
        var allTasks = realm.All<MyTask>();
        realm.Subscriptions.Add(allTasks, new SubscriptionOptions { Name = "allTasks" });
    }
};
var realm = Realm.GetInstance(config);
