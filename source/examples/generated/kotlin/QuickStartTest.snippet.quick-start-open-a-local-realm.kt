val config = RealmConfiguration.create(schema = setOf(Item::class))
    .build()
val realm: Realm = Realm.open(config)
