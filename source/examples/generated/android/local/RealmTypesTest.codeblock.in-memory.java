RealmConfiguration config = new RealmConfiguration.Builder()
        .inMemory() 
        .name("transient.realm")
        .build();
Realm realm = Realm.getInstance(config);
