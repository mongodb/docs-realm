// Use the configuration builder to open the realm
// using the newer schema version
// and define the migration logic between your old and new realm objects
val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2) // Set the new schema version to 2
    .migration(AutomaticSchemaMigration {
        val oldRealm = it.oldRealm // old realm using the previous schema
        val newRealm = it.newRealm // new realm using the new schema

        // Dynamic query for all Persons in old realm
        val oldPersons = oldRealm.query(className = "Person").find()
        for (oldPerson in oldPersons) {
            // Get properties from old realm using dynamic string-based API
            val firstName: String = oldPerson.getValue(propertyName = "firstName", clazz = String::class)
            val child: DynamicRealmObject? = oldPerson.getObject("")
        }

        // Get objects from old realm to use in the new realm as mutable objects
        val oldPerson: DynamicMutableRealmObject? =
            newRealm.findLatest(oldPersons[0])
        oldPerson?.let {
            it.set("fullName", "Crow T. Robot")
        }

        // Create an object in the new realm and set values for properties
        val newPerson = newRealm.copyToRealm(
            DynamicMutableRealmObject.create(
                type = "Person",
                mapOf(
                    "_id" to "123456",
                    "fullName" to "Tom Servo",
                    "yearsSinceBirth" to 33
                ))
        )
    })
    .build()
val realm = Realm.open(config)
