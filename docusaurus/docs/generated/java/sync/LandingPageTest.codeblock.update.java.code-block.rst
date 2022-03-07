.. code-block:: java

   // Sync uses SyncConfiguration instead of RealmConfiguration,
   // and requires both a logged-in user and a partition value
   SyncConfiguration config = new SyncConfiguration.Builder(
           app.currentUser(),
           "myPartition")
           .build();

   Realm realm = Realm.getInstance(config);

   realm.executeTransactionAsync(transactionRealm -> { // start a write transaction
       // get a frog from the database to update
       FrogJava frog = transactionRealm.where(FrogJava.class)
               .equalTo("name", "Benjamin Franklin")
               .findFirst();
       // change the frog's name
       frog.setName("George Washington");
       // change the frog's species
       frog.setSpecies("American bullfrog");
   }); // when the transaction completes, the frog's name and species
   // are updated in the database and synced to the connected Realm App
