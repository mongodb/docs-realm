SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v(
                "EXAMPLE",
                "Successfully opened a realm with reads and writes allowed on the UI thread."
        );

        AtomicReference<ObjectId> PRIMARY_KEY_VALUE  = new AtomicReference<ObjectId>();
        realm.executeTransaction( transactionRealm -> {
            Task newTask = new Task("test task");
            transactionRealm.insert(newTask);
            PRIMARY_KEY_VALUE.set(newTask.get_id());
        });

        realm.executeTransaction( transactionRealm -> {
            Task task = transactionRealm.where(Task.class).equalTo("_id", PRIMARY_KEY_VALUE.get()).findFirst();
            Log.v("EXAMPLE", "Fetched object by primary key: " + task);
            Assert.assertEquals(task.get_id(), PRIMARY_KEY_VALUE.get());
        });
        expectation.fulfill();
        realm.close();
    }
});