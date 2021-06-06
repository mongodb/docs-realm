using Realms.Sync;

var realm = Realm.GetInstance(config);
await realm.GetSession().WaitForDownloadAsync();