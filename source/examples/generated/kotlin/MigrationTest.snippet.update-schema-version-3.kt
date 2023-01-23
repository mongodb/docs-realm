// Use the configuration builder to open the realm
// using the newer schema version
val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(3) // Sets the new schema version to 3
    .build()
val realm = Realm.open(config)
