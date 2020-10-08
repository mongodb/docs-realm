config = new SyncConfiguration("My Project", user);
using var realm = await Realm.GetInstanceAsync(config);
var allTasks = realm.All<RealmTask>();