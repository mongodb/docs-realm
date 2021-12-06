// After copying the above created file to the project folder,
// we can access it in Application.dataPath:
var realmPath = Path.Combine(Application.dataPath, "bundled.realm");
var config = RealmConfiguration.DefaultConfiguration;
if (!File.Exists(config.DatabasePath))
{
   FileUtil.CopyFileOrDirectory(Path.Combine(Application.dataPath, "bundled.realm"), config.DatabasePath);
}

// If you are using a local Realm
var realm = Realm.GetInstance(config);

// If the realm is synced realm
var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());
config = new SyncConfiguration("myPartition", user);

var realm = await Realm.GetInstanceAsync(config);
