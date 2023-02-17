runBlocking {
    // Create the in-memory realm
    val inMemoryConfig = RealmConfiguration.Builder(setOf(Toad::class))
        .name("inMemory.realm")
        .inMemory()
        .build()

    // Open the realm and add data to it
    val inMemoryRealm = Realm.open(inMemoryConfig)
    inMemoryRealm.write {
        this.copyToRealm(Toad().apply {
            name = "Kermit"
        })
    }

    // Create the local realm
    val localConfig = RealmConfiguration.Builder(setOf(Toad::class))
        .name("local.realm")
        .build()
    // Copy data from `inMemoryRealm` to the new realm
    inMemoryRealm.writeCopyTo(localConfig)
    // Close the original realm when you're done copying
    inMemoryRealm.close()

    // Open the new local realm
    val localRealm = Realm.open(localConfig)

    // Copied Toad object is available in the new realm
    val toad: Toad =
        localRealm.query<Toad>().find().first()
    Log.v("Copied Toad: ${toad.name}")

    localRealm.close()
}
