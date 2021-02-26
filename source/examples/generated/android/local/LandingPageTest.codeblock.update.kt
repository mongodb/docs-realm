val config =
    RealmConfiguration.Builder()
        .build()
val realm = Realm.getInstance(config)


realm.executeTransactionAsync { transactionRealm: Realm ->  // start a write transaction
    // get a frog from the database to update
    val frog = transactionRealm.where(Frog::class.java)
        .equalTo("name", "Benjamin Franklin").findFirst()
    // change the frog's name
    frog?.name = "George Washington"
    // change the frog's species
    frog?.species = "American bullfrog"
} // when the transaction completes, the frog's name and species are updated in the database
