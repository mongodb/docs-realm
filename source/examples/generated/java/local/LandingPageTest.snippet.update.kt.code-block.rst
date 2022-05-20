.. code-block:: kotlin

   val config =
       RealmConfiguration.Builder()
           .build()
   val realm = Realm.getInstance(config)

   // start a write transaction
   realm.executeTransactionAsync { transactionRealm: Realm ->
       // get a frog from the database to update
       val frog = transactionRealm.where(Frog::class.java)
           .equalTo("name", "Benjamin Franklin").findFirst()
       // change the frog's name
       frog?.name = "George Washington"
       // change the frog's species
       frog?.species = "American bullfrog"
   } // when the transaction completes, the frog's name and species
   // are updated in the database
