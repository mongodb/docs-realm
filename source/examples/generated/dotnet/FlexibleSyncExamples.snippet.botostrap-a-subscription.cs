var config = new FlexibleSyncConfiguration(app.CurrentUser)
{
    PopulateInitialSubscriptions = (realm) =>
    {
        var myTasks = realm.All<Task>().Where(n => n.AuthorId == myUserId);
        realm.Subscriptions.Add(myTasks);
    }
};

// The process will complete when all the user's tasks have been downloaded.
var realm = await Realm.GetInstanceAsync(config);
