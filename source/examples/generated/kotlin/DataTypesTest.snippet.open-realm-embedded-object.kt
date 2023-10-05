// Include parent and embedded object classes in schema
val config = RealmConfiguration.Builder(
    setOf(Contact::class, EmbeddedAddress::class)
)
    .build()
val realm = Realm.open(config)
