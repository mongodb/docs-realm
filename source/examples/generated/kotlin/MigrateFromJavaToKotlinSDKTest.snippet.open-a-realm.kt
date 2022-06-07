val config = RealmConfiguration
    .create(schema = setOf(Frog::class,
        Sample::class))
val realm = Realm.open(config)
Log.v("Successfully opened realm:" +
        "${realm.configuration.name}")
