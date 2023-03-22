// Access your app
val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)

// Access the configuration builder for the app
val config = SyncConfiguration.Builder(user, setOf(Toad::class))

    // Set the logger to provide debug log
    // Must be set BEFORE you open a synced realm
    .log(LogLevel.DEBUG)

    .initialSubscriptions { realm ->
        add(realm.query<Toad>("name == $0", "name value"),  "sync subscription")
    }
    .build()

// Open the synced realm
val realm = Realm.open(config)
