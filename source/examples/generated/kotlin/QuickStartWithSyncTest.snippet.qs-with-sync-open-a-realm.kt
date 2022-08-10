val config = SyncConfiguration.Builder(user, setOf(Task::class))
    .initialSubscriptions { realm ->
        add(
            realm.query<Task>(
                "status == $0",
                "Open"
            ),
            "Open Tasks"
        )
    }
    .build()
val realm = Realm.open(config)
