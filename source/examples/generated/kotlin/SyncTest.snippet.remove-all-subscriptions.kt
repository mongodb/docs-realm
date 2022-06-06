// create an initial subscription named "subscription name"
val config = SyncConfiguration.Builder(user, setOf(Movie::class))
    .initialSubscriptions { realm ->
        add(
            realm.query<Movie>(
                "name == $0",
                "name value"
            ),
            "subscription name"
        )
    }
    .build()
val realm = Realm.open(config)

// remove all subscriptions
realm.subscriptions.update {
    this.removeAll()
}
