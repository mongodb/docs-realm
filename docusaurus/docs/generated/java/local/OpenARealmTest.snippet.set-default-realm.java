RealmConfiguration config = new RealmConfiguration.Builder()
        .name("default-realm")
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .compactOnLaunch()
        .inMemory()
        .build();
// set this config as the default realm
Realm.setDefaultConfiguration(config); 
