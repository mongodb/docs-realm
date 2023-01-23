// Use the configuration builder to open the realm
// using the newer schema version
// and define the migration logic between your old and new realm objects
val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2) // Set the new schema version to 2
    .migration(AutomaticSchemaMigration {
        it.enumerate(className = "Person") { oldObject: DynamicRealmObject, newObject: DynamicMutableRealmObject? ->
            newObject?.run {
                // Merge properties
                set(
                    "fullName",
                    "${oldObject.getValue<String>(fieldName = "firstName")} ${oldObject.getValue<String>(fieldName = "lastName")}"
                )

                // Rename property
                set(
                    "yearsSinceBirth",
                    oldObject.getValue<String>(fieldName = "age"))

                // Change property type
                set(
                    "_id",
                    oldObject.getValue<ObjectId>(fieldName = "_id").toString())
            }
        }
    })
    .build()
val realm = Realm.open(config)
