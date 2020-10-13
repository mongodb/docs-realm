config = new SyncConfiguration("myPartition", user);
using var realm = await Realm.GetInstanceAsync(config);
var allTasks = realm.All<Task>();