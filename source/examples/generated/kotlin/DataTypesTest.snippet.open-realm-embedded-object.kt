// Include parent and embedded objects in schema
val config = RealmConfiguration.Builder(
    setOf(Contact::class, Address::class)
)
    .build()
val realm = Realm.open(config)
