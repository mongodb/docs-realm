// Same realm file location as secondary process
String realmPath =
    path.join(Configuration.defaultStoragePath, 'synced.realm');

Configuration flexibleConfig =
    Configuration.flexibleSync(currentUser, schema, path: realmPath);
Realm realmWithSync = Realm(flexibleConfig);
