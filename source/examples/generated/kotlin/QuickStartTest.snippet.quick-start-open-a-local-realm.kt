val config = RealmConfiguration.Builder(schema = setOf(Item::class))
    .build()
val realm: Realm = Realm.open(config)
