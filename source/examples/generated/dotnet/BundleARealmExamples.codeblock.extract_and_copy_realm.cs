
// Extract and copy the realm
var config = RealmConfiguration.DefaultConfiguration;
if (!File.Exists(config.DatabasePath))
{
    using var bundledDbStream = Assembly.GetExecutingAssembly()
        .GetManifestResourceStream("bundled.realm");
    using var databaseFile = File.Create(config.DatabasePath);
    bundledDbStream.CopyTo(databaseFile);
}

// If you are using a local realm
var realm = Realm.GetInstance(config);

// If the realm file is a synced realm
var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());
config = new SyncConfiguration("myPartition", user);
var syncedRealm = await Realm.GetInstanceAsync(config);
