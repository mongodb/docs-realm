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

        realm.executeTransaction(transactionRealm -> {
            Cat newCat = new Cat("bucky");
            Human newHuman = new Human("steven");
            newHuman.setCat(newCat);
            transactionRealm.insert(newHuman);
        });

        realm.executeTransaction(transactionRealm -> {
            Human owner = transactionRealm.where(Human.class).equalTo("cat.name", "bucky").findFirst();
            Cat cat = owner.getCat();
            Log.v("EXAMPLE", "Queried for humans with cats named 'bucky'. Found " + owner.getName() + ", who owns " + cat.getName());
            Assert.assertEquals(owner.getName(), "steven");
            Assert.assertEquals(cat.getName(), "bucky");
        });
        expectation.fulfill();
        realm.close();
    }
});