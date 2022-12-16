val config = RealmConfiguration.Builder(setOf(Frog::class))
    .inMemory()
    .build()

val realm = Realm.open(config)
Log.v("Successfully opened an in memory realm")