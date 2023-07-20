// Bootstrap the realm with an initial query to subscribe to
val initializedFlexSyncConfig =
    SyncConfiguration.Builder(user, setOf(Team::class, Task::class))
        .initialSubscriptions { realm ->
            add(
                realm.query<Team>("$0 IN members", "Bob Smith"),
                "bob_smith_teams"
            )
        }
        .build()
