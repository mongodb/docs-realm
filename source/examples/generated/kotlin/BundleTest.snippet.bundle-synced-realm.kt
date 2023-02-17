runBlocking {
    val app = App.create(YOUR_APP_ID)

    // Login with user that has the server-side permissions
    // of the users of the bundled realm
    val user = app.login(credentials)

    // Create a SyncConfiguration to open the existing synced realm
    val originalConfig = SyncConfiguration.Builder(user, setOf(Item::class))
        .name("original.realm")
        // Add a subscription that matches the data being added
        // and your app's backend permissions
        .initialSubscriptions{ realm ->
            add(
                realm.query<Item>("summary == $0", "summary value"), "subscription name")
        }
        .build()
    val originalRealm = Realm.open(originalConfig)

    originalRealm.writeBlocking {
        // Add seed data to the synced realm
        copyToRealm(Item().apply {
            summary = "Do the laundry"
            isComplete = false
        })

        // Verify the data in the existing realm
        // (this data should also be in the bundled realm we open later)
        val originalItems: RealmResults<Item> = originalRealm.query<Item>().find()
        for(item in originalItems) {
            Log.v("My Item: ${item.summary}")
        }
    }
    // IMPORTANT: Sync all changes with server before copying the synced realm
    originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
    originalRealm.syncSession.downloadAllServerChanges(30.seconds)

    // Create a SyncConfiguration for the bundled copy with a file name
    val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
        .name("bundled.realm")
        .build()

    // Copy the synced realm with writeCopyTo()
    originalRealm.writeCopyTo(copyConfig)

    // Get the path to the copy you just created
    Log.v("Bundled realm location: ${copyConfig.path}")

    originalRealm.close()
}
