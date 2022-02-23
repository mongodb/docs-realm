val app = App.create(YOUR_APP_ID)
runBlocking() {
    val user = app.login(Credentials.anonymous())
    val config = SyncConfiguration.Builder(user, PARTITION)
        // specify name so realm doesn't just use the "default.realm" file for this user
        .name(PARTITION)
        .path("/tmp/$PARTITION")
        .maxNumberOfActiveVersions(10)
        .build()
    val realm = Realm.open(config)
    Log.v("Successfully opened realm: ${realm.configuration}")
    realm.close()
}
