RealmConfiguration config = new RealmConfiguration.Builder()
        .build();

Realm realm = Realm.getInstance(config);

realm.executeTransactionAsync(transactionRealm -> { // start a write transaction
    // get a frog from the database to update
    Frog frog =
            transactionRealm.where(Frog.class)
                    .equalTo("name", "Benjamin Franklin").findFirst();
    // change the frog's name
    frog.setName("George Washington");
    // change the frog's species
    frog.setSpecies("American bullfrog");
}); // when the transaction completes, the frog's name and species
// are updated in the database
