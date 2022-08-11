// create a SyncConfiguration
val config = SyncConfiguration.Builder(
    user,
    setOf(Task::class)
) // the SyncConfiguration defaults to Flexible Sync, if a Partition is not specified
    .initialSubscriptions { realm ->
        add(
            realm.query<Task>(
                "priority > 3"
            ),
            "High Priority Tasks"
        )
    }
    .build()
val realm = Realm.open(config)
