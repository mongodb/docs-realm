package com.mongodb.realm.realmkmmapp

//import kotlinx.coroutines.runBlocking
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.backlinks
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.RealmSet
import io.realm.kotlin.types.RealmUUID
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test

// :replace-start: {
//    "terms": {
//       "Frog2": "Frog",
//       "Cat2": "Cat",
//       "Cat3": "Cat",
//       "PersistedName_": ""
//    }
// }

class Fish : RealmObject {
    var _id: ObjectId = ObjectId()
}

// :snippet-start: to-many-relationship
class Sushi : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var fishes: RealmList<Fish> = realmListOf<Fish>()
}
// :snippet-end:

// :snippet-start: to-one-relationship
class SushiPlatter : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var fish: Fish? = null
}
// :snippet-end:

// :snippet-start: inverse-relationship-user
class User: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var posts: RealmList<Post> = realmListOf()
}
// :snippet-end:

// :snippet-start: inverse-relationship-post
class Post: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var title: String = ""
    val user: RealmResults<User> by backlinks(User::posts)
}
// :snippet-end:

class Frog2 : RealmObject {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack2> = realmSetOf<Snack2>()
}

class Snack2 : RealmObject {
    var name: String? = null
}

class Cat: RealmObject {
    @PrimaryKey
    var _id: RealmUUID = RealmUUID.random()
}

// :snippet-start: declare-properties
class Cat3 : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId() // Primary key

    @Index
    var name: String = "" // Indexed property

    var color: String? = null // Optional property

    var age: Int = 0 // 0 is default value

    @Ignore
    var tempId: Int = 0 // Ignored property

    @PersistedName("latin_name") // Remapped property
    var species: String? = null
}
// :snippet-end:

// :snippet-start: class-persisted-name
@PersistedName(name = "Feline")
class PersistedName_Cat : RealmObject {
    var name: String = ""
    var color: String? = null
    var age: Int = 0
}
// :snippet-end:

class SchemaTest: RealmTest() {
    @Test
    fun createUUIDTypes() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(Cat::class) // Pass the defined class as the object schema
            )
                // :remove-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :remove-end:
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete cats to make this test successful on consecutive reruns
            realm.write {
                // fetch all cats from the realm
                val cats: RealmResults<Cat> = this.query<Cat>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(cats)
            }

            realm.write {
                this.copyToRealm(Cat().apply {
                    _id = RealmUUID.random()
                })
            }

            realm.write {
                this.copyToRealm(Cat().apply {
                    _id = RealmUUID.from("46423f1b-ce3e-4a7e-812f-004cf9c42d76")
                })
            }

            realm.close()
        }
    }
}

// :replace-end: