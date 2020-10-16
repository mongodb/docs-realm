config = new SyncConfiguration("myPartition", user);
var realm = await Realm.GetInstanceAsync(config);