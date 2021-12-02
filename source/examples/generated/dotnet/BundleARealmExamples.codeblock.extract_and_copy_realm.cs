// If you are using a local Realm
var config = RealmConfiguration.DefaultConfiguration;

// ...or...
// If the realm is synced realm
var app = App.Create(appConfig);
var user = await app.LogInAsync(Credentials.Anonymous());
var config = new SyncConfiguration("myPartition", user);

// Extract and copy the realm
if (!File.Exists(config.DatabasePath))
{
    using var bundledDbStream = Assembly.GetExecutingAssembly()
        .GetManifestResourceStream("bundled.realm");
    using var databaseFile = File.Create(config.DatabasePath);
    bundledDbStream.CopyTo(databaseFile);
}

// Then, open the realm
var realm = Realm.GetInstance(config);
