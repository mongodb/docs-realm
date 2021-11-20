val appID: String = YOUR_APP_ID // replace this with your App ID
val app = App(AppConfiguration.Builder(appID).build())
val anonymousCredentials = Credentials.anonymous()
app.loginAsync(anonymousCredentials) { it: App.Result<User?> ->
    if (it.isSuccess) {
        Log.v("EXAMPLE", "Successfully authenticated anonymously.")

        // asset file name should correspond to the name of the bundled file
        val config = SyncConfiguration.Builder(
                app.currentUser(),
                "PARTITION_YOU_WANT_TO_BUNDLE")
            .assetFile("example_bundled.realm") 
            .build()
        Realm.getInstanceAsync(config, object : Realm.Callback() {
            override fun onSuccess(realm: Realm) {
                Log.v("EXAMPLE", "Successfully opened bundled realm.")

                // read and write to the bundled realm as normal
                realm.executeTransactionAsync { transactionRealm: Realm ->
                    val frog = Frog(
                        ObjectId(),
                        "Asimov",
                        4,
                        "red eyed tree frog",
                        "Spike"
                    )
                    transactionRealm.insert(frog)
                    expectation.fulfill()
                }
            }

            override fun onError(exception: Throwable) {
                Log.e("EXAMPLE", "Realm opening failed: $exception")
            }
        })
    } else {
        Log.e("EXAMPLE", "Failed to authenticate: ${it.error}")
    }
}
