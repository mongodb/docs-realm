runBlocking {
    val user = app.login(Credentials.anonymous())
    val originalConfig = SyncConfiguration.Builder(user, "MyPartition", setOf(Item::class))
        .name("original-path")
        .build()
    // open an existing realm
    val originalRealm = Realm.open(originalConfig)

    originalRealm.writeBlocking {

        // add some seed data to the original realm
        copyToRealm(Item().apply {
            summary = "Do the laundry"
            isComplete = false
        })
    }

    val copyConfig = SyncConfiguration.Builder(user, "MyPartition", setOf(Item::class))
        .name("copy-path")
        .build()

    // Make sure the file doesn't already exist
    Realm.deleteRealm(copyConfig)


    // IMPORTANT: When copying a Synced realm, you must ensure
    // that there are no pending Sync operations. You do this
    // by calling uploadAllLocalChanges() and downloadAllServerChanges():
    originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
    originalRealm.syncSession.downloadAllServerChanges(30.seconds)

    // Copy the realm
    originalRealm.writeCopyTo(copyConfig)

    val copyRealm = Realm.open(copyConfig)
    val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
    for(item in copiedItems) {
        Log.v("My copied Item: ${item.summary}") // you should see the seed data you created earlier
    }

}
