val app = App.create(FLEXIBLE_APP_ID)
val user = app.login(credentials)
val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Car::class))
    // Add subscription
    .initialSubscriptions { realm ->
        add(
            // Get Cars from Atlas that match the Realm Query Language query.
            // Uses the queryable field `miles`.
            // Query matches cars with less than 100 miles or `null` miles.
            realm.query<Car>(
                "miles < 100 OR miles == \$0", null
            ),
            "new-car-subscription"
        )
    }
    .build()
val syncRealm = Realm.open(flexSyncConfig)
syncRealm.subscriptions.waitForSynchronization()
Log.v("Successfully opened realm: ${syncRealm.configuration}")
