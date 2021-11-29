// open an existing realm
var realm = await Realm.GetInstanceAsync();

// Create a RealmConfiguration for the *copy*
var config = new SyncConfiguration("myPart", user, "bundled.realm");

// Make sure the file doesn't already exist
Realm.DeleteRealm(config);

// IMPORTANT: When copying a Synced realm, you must ensure
// that there are no pending Sync operations. You do this
// by calling WaitForUploadAsync() and WaitForDownloadAsync():
var session = realm.SyncSession;
await session.WaitForUploadAsync();
await session.WaitForDownloadAsync();

// Copy the realm
realm.WriteCopy(config);

// Want to know where the copy is?
var locationOfCopy = config.DatabasePath;
