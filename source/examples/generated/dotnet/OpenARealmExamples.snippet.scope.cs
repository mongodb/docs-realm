config = new PartitionSyncConfiguration("myPart", user);
using (var realm = Realm.GetInstance(config))
{
    var allTasks = realm.All<Task>();
}
