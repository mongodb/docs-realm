val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
    .allowWritesOnUiThread(true)
    .allowQueriesOnUiThread(true)
    .build()

Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v(
            "EXAMPLE",
            "Successfully opened a realm with reads and writes allowed on the UI thread."
        )


        realm.executeTransaction { transactionRealm ->
            val task = transactionRealm.where<Task>().equalTo("_id", PRIMARY_KEY_VALUE).findFirst()
            Log.v("EXAMPLE", "Found object by primary key: $task")
        }
        realm.close()
    }
})