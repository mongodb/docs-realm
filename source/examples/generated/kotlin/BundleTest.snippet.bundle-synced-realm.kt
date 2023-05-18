runBlocking {
    val app = App.create(yourFlexAppId)

    // Login with user that has the server-side permissions
    // of the users of the bundled realm
    val user = app.login(credentials)

    // Create a SyncConfiguration to open a synced realm to use as the asset realm
    val assetRealmConfig = SyncConfiguration.Builder(user, setOf(Item::class))
        .name("asset.realm")
        // Add a subscription that matches the data being added
        // and your app's backend permissions
        .initialSubscriptions{ realm ->
            add(
                realm.query<Item>("isComplete == $0", false), "Incomplete Items")
        }
        .build()
    val assetRealm = Realm.open(assetRealmConfig)

    assetRealm.subscriptions.waitForSynchronization(10.seconds)
    assertEquals(SubscriptionSetState.COMPLETE, assetRealm.subscriptions.state)

    assetRealm.writeBlocking {
        // Add seed data to the synced realm
        copyToRealm(Item().apply {
            summary = "Write an awesome app"
            isComplete = false
        })
    }
    // Verify the data in the existing realm
    // (this data should also be in the bundled realm we open later)
    val assetItems: RealmResults<Item> = assetRealm.query<Item>().find()
    for(item in assetItems) {
        Log.v("Item in the assetRealm: ${item.summary}")
    }

    // IMPORTANT: Sync all changes with server before copying the synced realm
    assetRealm.syncSession.uploadAllLocalChanges(30.seconds)
    assetRealm.syncSession.downloadAllServerChanges(30.seconds)

    // Create a SyncConfiguration for the bundled copy with a file name
    val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
        .name("prefilled.realm")
        .initialRealmFile("asset.realm")
        .build()

    // Copy the synced realm with writeCopyTo()
    assetRealm.writeCopyTo(copyConfig)
    assetRealm.close()

    // Open and use the bundled realm
    val copiedRealm = Realm.open(copyConfig)

    // This should contain the same Items as in the asset realm
    val copiedItems: RealmResults<Item> = copiedRealm.query<Item>().find()
    for(item in copiedItems) {
        Log.v("Item in the copiedRealm: ${item.summary}")
    }

    copiedRealm.close()
}
