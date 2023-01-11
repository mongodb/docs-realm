RealmConfiguration config = new RealmConfiguration.Builder()
        .inMemory() 
        .name("java.transient.realm")
        .build();
Realm realm = Realm.getInstance(config);
