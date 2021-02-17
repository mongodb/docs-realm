RealmConfiguration config = new RealmConfiguration.Builder()
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");


        realm.executeTransaction(transactionRealm -> {
            Cat cat = transactionRealm.where(Cat.class).equalTo("owner.name", "steven").findFirst();
            Human owner = cat.getOwner().first();
            Log.v("EXAMPLE", "Queried for cats with owners named 'steven'. Found " + cat.getName() + ", owned by " + owner.getName());
        });
        realm.close();
    }
});
