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
// to update that subscription, add another subscription with the same name
// it will replace the existing subscription
realm.subscriptions.update {
    this.add(
        realm.query<Movie>("name == $0", "another name value"),
        "subscription name"
    )
}
