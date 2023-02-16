runBlocking {
    val app = App.create(YOUR_APP_ID)

    // Login with user that has the server-side permissions
    // of the users of the bundled realm
    val user = app.login(credentials)

    // Create a SyncConfiguration to open the existing synced realm
    val originalConfig = SyncConfiguration.Builder(user, setOf(Item::class))
        .name("original.realm")
        .build()
    val originalRealm = Realm.open(originalConfig)
    Log.v("${originalRealm.configuration.path}")

    // Add a subscription that matches the data being added
    // and your app's backend permissions
    originalRealm.subscriptions.update {
        this.add(originalRealm.query<Item>("summary == $0", "summary value"), "subscription name")
    }
    originalRealm.subscriptions.waitForSynchronization(Duration.parse("10s"))

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

    // Verify the copied realm contains the data we expect
    val copyRealm = Realm.open(copyConfig)
    val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
    for(item in copiedItems) {
        Log.v("My copied Item: ${item.summary}")
    }

    originalRealm.close()
    copyRealm.close()
}
