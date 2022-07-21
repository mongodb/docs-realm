// create an initial subscription named "subscription name"
val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .initialSubscriptions { realm ->
        add(
            realm.query<Toad>(
                "name == $0",
                "name value"
            ),
            "subscription name"
        )
    }
    .build()
val realm = Realm.open(config)
// wait for synchronization to complete before editing subscriptions
realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
// remove all subscriptions to type Toad
realm.subscriptions.update {
    this.removeAll(Toad::class)
}
