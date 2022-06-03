val app = App.create(YOUR_APP_ID)
runBlocking {
    val user = app.login(Credentials.anonymous())
    val config = SyncConfiguration.Builder(user, setOf(Frog::class))
        .maxNumberOfActiveVersions(10)
        .waitForInitialRemoteData()
        .name("realm name")
        .initialSubscriptions { realm ->
            add(
                realm.query<Frog>(
                    "name == $0",
                    "name value"
                ),
                "query name"
            )
        }
        .build()
    val realm = Realm.open(config)
    Log.v("Successfully opened realm: ${realm.configuration}")
    realm.close()
}
