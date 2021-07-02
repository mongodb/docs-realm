val config = RealmConfiguration(schema = setOf(Task::class))
val realm = Realm.open(config)
