package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.migration.AutomaticSchemaMigration
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import co.touchlab.kermit.Kermit
import com.mongodb.realm.realmkmmapp.Log.kermit
import io.realm.kotlin.dynamic.DynamicMutableRealmObject
import io.realm.kotlin.dynamic.DynamicRealmObject
import io.realm.kotlin.dynamic.getValue

// :replace-start: {
//   "terms": {
//     "MigrationExampleV1_": "",
//     "MigrationExampleV2_": "",
//     "MigrationExampleV3_": "",
//     "MigrationExampleV4_": "",
//     "MigrationExampleV5_": "",
//     "MigrationExampleV1Update1_": "",
//     "MigrationExampleV1Update2_": ""
//   }
// }

// :snippet-start: model-v1
class MigrationExampleV1_Person : RealmObject {
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
    var email: String? = null // adds a new property
}
// :snippet-end:
// :snippet-start: model-v2
class MigrationExampleV2_Person : RealmObject {
    var firstName: String = ""
    var lastName: String = ""
    // var age: Int = 0
    var email: String? = null
}
// :snippet-end:
// :snippet-start: model-v3
class MigrationExampleV3_Person : RealmObject { // Realm schema version 3
    var firstName: String = ""
    var lastName: String = ""
    // var age: Int = 0
    var email: String? = null
}
// :snippet-end:
// :snippet-start: model-v5
// Realm schema version 1 (oldObject)
class MigrationExampleV4_Person : RealmObject {
    var _id: ObjectId = ObjectId()
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
}

// Realm schema version 2 (newObject)
class MigrationExamplev5_Person : RealmObject {
    var _id: String = "" // change property type
    var fullName: String = "" // merge firstName and lastName properties
    var yearsSinceBirth: Int = 0 // rename property
}
// :snippet-end:

class MigrationTest {

    @Test
    fun updateSchemaVersion1Test() {
        runBlocking {
// :snippet-start: update-schema-version-2
            // Use the configuration builder to open the realm
            // using the newer schema version
            val config = RealmConfiguration.Builder(
                schema = setOf(MigrationExampleV2_Person::class)
            )
                .schemaVersion(2) // Sets the new schema version to 2
                .build()
            val realm = Realm.open(config)
// :snippet-end:
            realm.close()
        }
    }

    @Test
    fun updateSchemaVersion2Test() {
        runBlocking {
// :snippet-start: update-schema-version-3
            // Use the configuration builder to open the realm
            // using the newer schema version
            val config = RealmConfiguration.Builder(
                schema = setOf(MigrationExampleV3_Person::class)
            )
                .schemaVersion(3) // Sets the new schema version to 3
                .build()
            val realm = Realm.open(config)
// :snippet-end:
            realm.close()
        }
    }

    @Test
    fun localMigrationTest() {
        runBlocking {
// :snippet-start: local-migration
            // Use the configuration builder to open the realm
            // using the newer schema version
            // and define the migration logic between your old and new realm objects
            val config = RealmConfiguration.Builder(
                schema = setOf(MigrationExampleV4_Person::class)
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
// :snippet-end:
            realm.close()
        }
    }

    @Test
    fun localMigrationOtherTest() {
        runBlocking {
// :snippet-start: local-migration-other
            // Use the configuration builder to open the realm
            // using the newer schema version
            // and define the migration logic between your old and new realm objects
            val config = RealmConfiguration.Builder(
                schema = setOf(MigrationExampleV4_Person::class)
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
// :snippet-end:
            realm.close()
        }
    }

}

// :replace-end: