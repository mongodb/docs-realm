// GetRealm() is an asynchronous method that returns a synced realm
// GetRealm() takes a logged in Realms.Sync.User as a parameter
private static async Task<Realm> GetRealm(User loggedInUser)
{
    var syncConfiguration = new SyncConfiguration("UnityTutorialPartition", loggedInUser);
    return await Realm.GetInstanceAsync(syncConfiguration);
}
