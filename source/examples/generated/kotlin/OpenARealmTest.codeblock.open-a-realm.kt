val config = RealmConfiguration.Builder(setOf(Frog::class))
    .build()
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")
