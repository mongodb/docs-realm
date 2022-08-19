// Same realm file location as secondary process
String realmPath =
    path.join(Configuration.defaultStoragePath, 'synced1234.realm');

Configuration flexibleConfig =
    Configuration.flexibleSync(currentUser, schema, path: realmPath);
Realm realmWithSync = Realm(flexibleConfig);
