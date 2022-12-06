runBlocking {
    // :hide-start:
    val user = app.login(Credentials.anonymous())
    // :hide-end:
    // open an existing realm
    val originalConfig = SyncConfiguration.Builder(user, setOf(SyncTest.Toad::class))
        .name("original-realm")
        .initialSubscriptions { realm ->
            add(
                realm.query<SyncTest.Toad>(
                    "name == $0",
                    "name value"
                ),
                "subscription name"
            )
        }
        .build()
    val originalRealm = Realm.open(originalConfig)

    // Create a RealmConfiguration for the copy
    // Be sure the subscription matches the original
    val copyConfig = SyncConfiguration.Builder(user, setOf(SyncTest.Toad::class))
        .name("copy-realm")
        .initialSubscriptions { realm ->
            add(
                realm.query<SyncTest.Toad>(
                    "name == $0",
                    "name value"
                ),
                "subscription name"
            )
        }
        .build()

    // IMPORTANT: When copying a Synced realm, you must ensure
    // that there are no pending Sync operations. You do this
    // by calling uploadAllLocalChanges() and downloadAllServerChanges():
    originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
    originalRealm.syncSession.downloadAllServerChanges(30.seconds)
    
    // Copy the realm
    originalRealm.writeCopyTo(copyConfig)
}
