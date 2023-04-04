val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .syncClientResetStrategy(manualResetStrategy) // Specify a manual recovery strategy
    .build()


val realm = Realm.open(config)
// Close the realm before attempting the client reset
realm.close()
// ... Handle the reset manually here
// Then run the executeClientReset() manually
