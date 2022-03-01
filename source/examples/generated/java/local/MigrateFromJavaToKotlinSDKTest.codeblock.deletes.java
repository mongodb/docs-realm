Sample sample = realm.where(Sample.class).findFirst();

// delete one object synchronously
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm transactionRealm) {
        sample.deleteFromRealm();
    }
});

// delete a query result asynchronously
realm.executeTransactionAsync(new Realm.Transaction() {
    @Override
    public void execute(Realm backgroundRealm) {
        backgroundRealm.where(Sample.class).findFirst().deleteFromRealm();
    }
});
