var config = RealmConfiguration.DefaultConfiguration;
if (!File.Exists(config.DatabasePath))
{
    using var bundledDbStream = Assembly.GetExecutingAssembly()
        .GetManifestResourceStream("bundled.realm");
    using var databaseFile = File.Create(config.DatabasePath);
    bundledDbStream.CopyTo(databaseFile);
}

var realm = Realm.GetInstance(config);
