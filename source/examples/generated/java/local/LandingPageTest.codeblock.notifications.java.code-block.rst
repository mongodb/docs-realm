.. code-block:: java

   // configure and open a local realm
   RealmConfiguration config = new RealmConfiguration.Builder()
           .allowQueriesOnUiThread(true)
           .allowWritesOnUiThread(true)
           .build();
   Realm realm = Realm.getInstance(config);

   // create an reference to a frog
   AtomicReference<Frog> frog = new AtomicReference<Frog>();

   // insert a new frog into the database and store it in our reference
   realm.executeTransaction(transactionRealm -> {
       Frog result = transactionRealm.createObject(Frog.class);
       result.setName("Doctor Cucumber");
       result.setAge(3);
       result.setSpecies("Tree Frog");
       result.setOwner("Greg");
       frog.set(result);
   });

   // create a listener that logs new changes to the frog
   RealmObjectChangeListener<Frog> listener = (changedFrog, changeSet) -> {
       if (changeSet.isDeleted()) {
           Log.i("EXAMPLE", "The frog was deleted");
           return;
       }
       for (String fieldName : changeSet.getChangedFields()) {
           Log.i("EXAMPLE", "Field '" + fieldName + "' changed.");
       }
   };

   // attach the listener we just created to the frog
   frog.get().addChangeListener(listener);

   // update the frog
   realm.executeTransaction(transactionRealm -> {
       frog.get().setName("Ronald");
   });
   // when the transaction completes, the listener logs that "Field 'name' changed."
