// Login with authorized user and open a realm with a SyncConfiguration
val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)
val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Team::class, Task::class))
    .build()
val realm = Realm.open(flexSyncConfig)
Log.v("Successfully opened realm: ${realm.configuration}")
