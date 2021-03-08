RealmConfiguration config = new RealmConfiguration.Builder()
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm realm = Realm.getInstance(config);
Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
