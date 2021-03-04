User user = app.currentUser();
SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();
Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");
        // Read all tasks in the realm. No special syntax required for synced realms.
        RealmResults<Task> tasks = realm.where(Task.class).findAll();
        // Write to the realm. No special syntax required for synced realms.
        realm.executeTransaction(r -> {
            r.insert(new Task());
        });
        // Don't forget to close your realm!
        realm.close();
    }
});
