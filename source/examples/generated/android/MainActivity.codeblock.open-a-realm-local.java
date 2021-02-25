String partitionValue = "My Project";
RealmConfiguration config = new RealmConfiguration.Builder().build();

Realm backgroundThreadRealm = Realm.getInstance(config);
