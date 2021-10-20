val config = RealmConfiguration.with(schema = setOf(Task::class))
val realm = Realm.open(config)
