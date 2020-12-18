SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");

        realm.executeTransaction(transactionRealm -> {
            Cat newCat = new Cat("bucky");
            Human newHuman = new Human("steven");
            newHuman.setCat(newCat);
            transactionRealm.insert(newHuman);
        });

        realm.executeTransaction(transactionRealm -> {
            Cat cat = transactionRealm.where(Cat.class).equalTo("owner.name", "steven").findFirst();
            Human owner = cat.getOwner().first();
            Log.v("EXAMPLE", "Queried for cats with owners named 'steven'. Found " + cat.getName() + ", owned by " + owner.getName());
            Assert.assertEquals(cat.getName(), "bucky");
            Assert.assertEquals(owner.getName(), "steven");
        });
        expectation.fulfill();
        realm.close();
    }
});