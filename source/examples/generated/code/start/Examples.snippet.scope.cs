config = new SyncConfiguration("myPart", user);
using (var realm = await Realm.GetInstanceAsync(config)) { 
    var allTasks = realm.All<Task>();
}