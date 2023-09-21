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
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.datetime.Instant
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals

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

// :snippet-start: timestamp-workaround
// model class that stores an Instant (kotlinx-datetime) field as a RealmInstant via a conversion
class RealmInstantConversion : RealmObject {
    private var _timestamp: RealmInstant = RealmInstant.from(0, 0)
    public var timestamp: Instant
        get() {
            return _timestamp.toInstant()
        }
        set(value) {
            _timestamp = value.toRealmInstant()
        }
}

fun RealmInstant.toInstant(): Instant {
    val sec: Long = this.epochSeconds
    // The value always lies in the range `-999_999_999..999_999_999`.
    // minus for timestamps before epoch, positive for after
    val nano: Int = this.nanosecondsOfSecond

    return if (sec >= 0) { // For positive timestamps, conversion can happen directly
        Instant.fromEpochSeconds(sec, nano.toLong())
    } else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        Instant.fromEpochSeconds(sec - 1, 1_000_000 + nano.toLong())
    }
}

fun Instant.toRealmInstant(): RealmInstant {
    val sec: Long = this.epochSeconds
    // The value is always positive and lies in the range `0..999_999_999`.
    val nano: Int = this.nanosecondsOfSecond

    return if (sec >= 0) { // For positive timestamps, conversion can happen directly
        RealmInstant.from(sec, nano)
    } else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        RealmInstant.from(sec + 1, -1_000_000 + nano)
    }
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

    /*
    ** Test objects defined in Schema.kt **
     */
    @Test
    fun createRealmObjectsTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class, ExampleRealmSet_Frog::class, ExampleRealmSet_Snack::class, ExampleRealmDictionary_Frog::class, ExampleRealmObject_Forest::class, RealmList_Frog::class, RealmList_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()

                // create basic frog object
                val frogID = ObjectId()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    _id = frogID
                    age = 12
                    species = "bullfrog"
                    owner = "Gonzo"
                })
                val frog = query<ExampleRealmObject_Frog>().find().first()
                assertEquals("Kermit", frog.name)
                assertEquals(frogID, frog._id)
                delete(frog)
                assertEquals(0, query<ExampleRealmObject_Frog>().find().size)

                // create realm list object
                copyToRealm(RealmList_Frog().apply {
                    name = "Timerk"
                    favoritePonds.add(RealmList_Pond().apply {
                        name = "Pond1"
                    })
                    favoritePonds.add(RealmList_Pond().apply {
                        name = "Pond2"
                    })
                    favoriteForests.add(ExampleRealmObject_Forest().apply {
                        name = "Forest1"
                    })
                    favoriteForests.add(ExampleRealmObject_Forest().apply {
                        name = "Forest2"
                    })
                    favoriteWeather.add("rain")
                    favoriteWeather.add("snow")
                })
                val realmListFrog = query<RealmList_Frog>().find().first()
                assertEquals("Timerk", realmListFrog.name)
                assertEquals(2, realmListFrog.favoritePonds.size)
                assertEquals(2, realmListFrog.favoriteForests.size)
                assertEquals(2, realmListFrog.favoriteWeather.size)
                delete(realmListFrog)
                assertEquals(0, query<RealmList_Frog>().find().size)

                // create realm set object
                copyToRealm(ExampleRealmSet_Frog().apply {
                    name = "Kermit2"
                    favoriteSnacks.add(ExampleRealmSet_Snack().apply {
                        name = "some flies"
                    })
                    favoriteSnacks.add(ExampleRealmSet_Snack().apply {
                        name = "some worms"
                    })
                    favoriteWeather.add("rain")
                })
                val realmSetFrog = query<ExampleRealmSet_Frog>().find().first()
                assertEquals("Kermit2", realmSetFrog.name)
                assertEquals(2, realmSetFrog.favoriteSnacks.size)
                assertEquals(1, realmSetFrog.favoriteWeather.size)
                delete(realmSetFrog)
                assertEquals(0, query<ExampleRealmSet_Frog>().find().size)

                // create realm dictionary object
                val frog3Id = ObjectId()
                copyToRealm(ExampleRealmDictionary_Frog().apply {
                    name = "Kermit3"
                    _id = frog3Id
                    favoriteFriendsByPond["Pond1"] = ExampleRealmDictionary_Frog().apply {
                        name = "Frog1"
                    }
                    favoriteTreesInForest["Forest1"] = ExampleRealmObject_Forest().apply {
                        name = "Tree1"
                    }
                    favoritePondsByForest["Forest2"] = "Pond1"

                })
                val realmDictionaryFrog = query<ExampleRealmDictionary_Frog>().find().first()
                assertEquals("Kermit3", realmDictionaryFrog.name)
                assertEquals(frog3Id, realmDictionaryFrog._id)
                assertEquals(1, realmDictionaryFrog.favoriteFriendsByPond.size)
                assertEquals("Frog1", realmDictionaryFrog.favoriteFriendsByPond["Pond1"]?.name)
                assertEquals(1, realmDictionaryFrog.favoriteTreesInForest.size)
                assertEquals("Tree1", realmDictionaryFrog.favoriteTreesInForest["Forest1"]?.name)
                assertEquals(1, realmDictionaryFrog.favoritePondsByForest.size)
                assertEquals("Pond1", realmDictionaryFrog.favoritePondsByForest["Forest2"])
                delete(query<ExampleRealmDictionary_Frog>().find())
                assertEquals(0, query<ExampleRealmDictionary_Frog>().find().size)

        }
    }
}}

// :replace-end: