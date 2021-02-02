val user = app.currentUser()
val config = SyncConfiguration.Builder(user, partition)
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
        // Read all tasks in the realm. No special syntax required for synced realms.
        val tasks = realm.where(Task::class.java).findAll()
        // Write to the realm. No special syntax required for synced realms.
        realm.executeTransaction { r: Realm ->
            r.insert(Task())
        }
        // Don't forget to close your realm!
        realm.close()
    }
})
