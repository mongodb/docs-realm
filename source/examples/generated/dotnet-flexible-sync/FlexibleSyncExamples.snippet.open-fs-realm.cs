var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());

var config = new FlexibleSyncConfiguration(app.CurrentUser!);
var realm = Realm.GetInstance(config);

var subscriptions = realm.Subscriptions;

subscriptions.Update(() =>
{
    // subscribe to all Task objects, and give the subscription the name 'allTasks'
    var allTasks = realm.All<MyTask>();
    subscriptions
        .Add(allTasks,
            new SubscriptionOptions() { Name = "allTasks" });
});

try
{
    await subscriptions.WaitForSynchronizationAsync();
}
catch (SubscriptionException ex)
{
    // do something in response to the exception or log it
    Console.WriteLine($@"The subscription set's state is Error and synchronization is paused:  {ex.Message}");
}
