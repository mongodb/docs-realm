val config = RealmConfiguration.Builder()
    .schema(setOf(CRUDTest.Frog::class))
    // specify name so realm doesn't just use the "default.realm" file
    .name(REALM_NAME)
    .build()
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")
