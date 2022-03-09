User user = app.currentUser();
SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
    .build();
Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");
        // read and write to realm here via transactions
    }
});
