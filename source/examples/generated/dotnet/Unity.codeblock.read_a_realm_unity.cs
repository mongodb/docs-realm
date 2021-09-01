// After copying the above created file to the project folder,
// we can access it in Applicatoin.dataPath:
var realmPath = Application.dataPath + "/copy.realm";
// And then we open it like any other realm:
Realm realm = await Realm.GetInstanceAsync(realmPath);
