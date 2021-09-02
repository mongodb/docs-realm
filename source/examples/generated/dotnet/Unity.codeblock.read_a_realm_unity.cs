// After copying the above created file to the project folder,
// we can access it in Application.dataPath:
var realmPath = Path.Combine(Application.dataPath, "bundled.realm");
// And then we open it like any other realm:
Realm realm = await Realm.GetInstanceAsync(realmPath);
