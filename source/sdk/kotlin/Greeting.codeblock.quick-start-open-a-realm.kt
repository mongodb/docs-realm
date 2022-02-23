val config = RealmConfiguration.with(schema = setOf(Task::class))
val realm: Realm = Realm.open(config)
