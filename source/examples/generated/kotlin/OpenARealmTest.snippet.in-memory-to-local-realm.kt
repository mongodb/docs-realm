// Create in-memory realm
runBlocking {
    val inMemoryConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("inMemory.realm")
        .inMemory()
        .build()

    // Open the realm and add data to it
    val inMemoryRealm = Realm.open(inMemoryConfig)
    inMemoryRealm.write {
        this.copyToRealm(Frog().apply {
            name = "Kermit"
            age = 45
            species = "Green"
            owner = "Jim"
        })
    }

    // Create the local realm
    val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("local.realm")
        .build()
    // Copy data from `inMemoryRealm` to the new realm
    inMemoryRealm.writeCopyTo(localConfig)
    // Close the original realm when you're done copying
    inMemoryRealm.close()

    // Open the new local realm
    val localRealm = Realm.open(localConfig)

    // Copied frog object is available in the new realm
    val frog: Frog =
        localRealm.query<Frog>().find().first()
    Log.v("Copied frog: ${frog.name}")

    localRealm.close()
}
