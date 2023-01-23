// Use the configuration builder to open the realm using the newer schema version
val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2) // Set the new schema version
    .build()
val realm = Realm.open(config)
