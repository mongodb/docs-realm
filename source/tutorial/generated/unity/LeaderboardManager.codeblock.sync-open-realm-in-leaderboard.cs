// GetRealm() is an asynchronous method that returns a synced realm
private static async Task<Realm> GetRealm()
{
    var syncConfiguration = new SyncConfiguration("UnityTutorialPartition", RealmController.syncUser);
    return await Realm.GetInstanceAsync(syncConfiguration);
}
