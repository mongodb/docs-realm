val config = RealmConfiguration.Builder()
    .schema(setOf(Task::class))
    .build()
val realm: Realm = Realm.open(config)
