// configure and open a local realm
RealmConfiguration config = new RealmConfiguration.Builder()
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();
Realm realmA = Realm.getInstance(config);
Realm realmB = Realm.getInstance(config);


// get a reference to a single frog object
// stored in the database from each realm instance
Frog frogA = realmA.where(Frog.class)
        .equalTo("name", "Mr. President").findFirst();
Frog frogB = realmB.where(Frog.class)
        .equalTo("name", "Mr. President").findFirst();

// update frog A's name
realmA.executeTransaction(transactionRealm -> {
    frogA.setName("Skipper");
});
// frog B instance automatically updates with the new name
Assert.assertEquals(frogA.getName(), frogB.getName());

// update frog B's age
realmB.executeTransaction(transactionRealm -> {
    frogB.setAge(10);
});
// frog A instance automatically updates with the new age
Assert.assertEquals(frogB.getAge(), frogA.getAge());
