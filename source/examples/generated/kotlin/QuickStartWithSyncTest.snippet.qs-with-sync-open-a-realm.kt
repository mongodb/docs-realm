val config = SyncConfiguration.Builder(user, setOf(Task::class))
    .initialSubscriptions { realm ->
        add(
            realm.query<Task>(
                "priority > 3",
                "Open"
            ),
            "High Priority Tasks"
        )
    }
    .build()
val realm = Realm.open(config)
