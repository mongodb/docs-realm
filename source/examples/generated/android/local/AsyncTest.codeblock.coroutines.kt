// open a realm asynchronously
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully fetched realm instance")

        CoroutineScope(Dispatchers.IO).launch {
            // asynchronous transaction
            realm.executeTransactionAwait { transactionRealm: Realm ->
                if (isActive) {
                    val item = transactionRealm.createObject(Item::class.java)
                }
            }
        }
        // asynchronous query
        val items: Flow<RealmResults<Item>> = realm.where(Item::class.java).findAllAsync().toFlow()
    }

    fun onError(e: Exception) {
        Log.e("EXAMPLE", "Failed to get realm instance: $e")
    }
})
