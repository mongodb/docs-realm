// Sync uses SyncConfiguration instead of RealmConfiguration,
// and requires both a logged-in user and a partition value
val config : SyncConfiguration =
    SyncConfiguration.Builder(app.currentUser(), "myPartition")
        .build()
val realm = Realm.getInstance(config)

// start a write transaction
realm.executeTransactionAsync { transactionRealm: Realm ->
    // get a frog from the database to update
    val frog =
        transactionRealm.where(FrogJava::class.java)
            .equalTo("name", "Benjamin Franklin").findFirst()
    // change the frog's name
    frog!!.setName("George Washington")
    // change the frog's species
    frog.setSpecies("American bullfrog")
} // when the transaction completes, the frog's name and species
// are updated in the database and synced to the connected Realm App
