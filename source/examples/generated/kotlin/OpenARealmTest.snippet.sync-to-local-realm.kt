// Instantiate the synced realm with your App ID
val app = App.create(YOUR_APP_ID)

runBlocking {
    val user = app.login(Credentials.anonymous())
    // Create the synced realm configuration
    val syncConfig = SyncConfiguration.Builder(user, setOf(Toad::class))
        .initialSubscriptions { realm ->
            add(
                realm.query<Toad>("name == $0", "name value"),
                "subscription name"
            )
        }
        .build()

    // Open the synced realm and add data to it
    val syncRealm = Realm.open(syncConfig)
    Log.v("Successfully opened realm: ${syncRealm.configuration}")

    syncRealm.write {
        this.copyToRealm(Toad().apply {
            name = "Kermit"
        })
    }
    // Wait for write to sync
    syncRealm.syncSession.uploadAllLocalChanges(30.seconds)

    // Create the local realm
    val localConfig = RealmConfiguration.Builder(setOf(Toad::class))
        .name("local.realm")
        .build()
    // Copy data from synced realm to the new realm
    syncRealm.writeCopyTo(localConfig)
    // Close the synced realm when you're done copying
    syncRealm.close()

    // Open the new local realm
    val localRealm = Realm.open(localConfig)

    // Copied Toad object is available in the new realm
    val toad: Toad =
        localRealm.query<Toad>().find().first()
    Log.v("Copied Toad: ${toad.name}")

    localRealm.close()
}
