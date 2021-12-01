// Extract and copy the realm
var config = RealmConfiguration.DefaultConfiguration;
if (!File.Exists(config.DatabasePath))
{
    using var bundledDbStream = Assembly.GetExecutingAssembly()
        .GetManifestResourceStream("bundled.realm");
    using var databaseFile = File.Create(config.DatabasePath);
    bundledDbStream.CopyTo(databaseFile);
}

// Then, open the realm
// If the realm is not a synced realm:
var localRealm = Realm.GetInstance(config);

// ...or...
// If the realm is sycned realm:
var app = App.Create(appConfig);
var user = app.LogInAsync(Credentials.Anonymous()).Result;
var syncConfig = new SyncConfiguration("myPartition", user);
var syncedRealm = await Realm.GetInstanceAsync(syncConfig);
