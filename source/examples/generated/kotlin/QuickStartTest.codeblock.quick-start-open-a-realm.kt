val config = RealmConfiguration.Builder(setOf(Task::class))
    .build()
val realm: Realm = Realm.open(config)
