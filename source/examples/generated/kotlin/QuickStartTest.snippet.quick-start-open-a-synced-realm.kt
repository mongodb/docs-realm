// create a SyncConfiguration
val config = SyncConfiguration.Builder(
    user,
    setOf(Item::class)
) // the SyncConfiguration defaults to Flexible Sync, if a Partition is not specified
    .initialSubscriptions { realm ->
        add(
            realm.query<Item>(
                "owner_id == $0", // pass the user in as an argument
                user // the logged in user
            ),
            "User's Items"
        )
    }
    .build()
val realm = Realm.open(config)
