package com.mongodb.realm.realmkmmapp

//import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.launch
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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.datetime.Instant
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "Frog2": "Frog",
//       "Cat2": "Cat",
//       "Cat3": "Cat"
//    }
// }

// :snippet-start: primary-key
class Lizard : RealmObject {
    @PrimaryKey
    val _id: ObjectId = ObjectId()
}
// :snippet-end:

// :snippet-start: ignore
class ShoppingCart : RealmObject {
    val _id: ObjectId = ObjectId()

    @Ignore
    val items: List<String> = listOf()
}
// :snippet-end:

// :snippet-start: index
class Movie : RealmObject {
    @Index
    val _id: ObjectId = ObjectId()
    val starring: List<String> = listOf()
}
// :snippet-end:

class Fish : RealmObject {
    val _id: ObjectId = ObjectId()
}

// :snippet-start: to-many-relationship
class Sushi : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String = ""
    val fishes: RealmList<Fish> = realmListOf<Fish>()
}
// :snippet-end:

// :snippet-start: to-one-relationship
class SushiPlatter : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String = ""
    val fish: Fish? = null
}
// :snippet-end:

// :snippet-start: inverse-relationship-user
class User: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    lateinit var name: String
    val posts: RealmList<Post>? = null
}
// :snippet-end:

// :snippet-start: inverse-relationship-post
class Post: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    lateinit var title: String
    val user: RealmResults<User> by backlinks(User::posts)
}
// :snippet-end:

// :snippet-start: persisted-name
class Horse : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String =""
    @PersistedName("rider_name")
    val riderName: Knight? = null
}
// :snippet-end:

// :snippet-start: optional
class Knight : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String = ""
    val mount: Horse? = null
}
// :snippet-end:

// :snippet-start: define-a-realm-set
class Frog2 : RealmObject {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> = realmSetOf<Snack>()
}

class Snack : RealmObject {
    var name: String? = null
}
// :snippet-end:

// :snippet-start: uuid
class Cat: RealmObject {
    @PrimaryKey
    var _id: RealmUUID = RealmUUID.random()
}
// :snippet-end:

// :snippet-start: example-schema
class Car : RealmObject {
    var make: String = ""
    var model: String = ""
    var miles: Int = 0
}
// :snippet-end:

// :snippet-start: define-object-type
// Defines a `Cat` object type
// with several properties
class Cat2 : RealmObject {
    var name: String = ""
    var color: String? = null
    var age: Int = 0
}
// :snippet-end:

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
            // :snippet-start: open-with-class
            val config = RealmConfiguration.Builder(
                schema = setOf(Cat::class) // Pass the defined class as the object schema
            )
                // :remove-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :remove-end:
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete cats to make this test successful on consecutive reruns
            realm.write {
                // fetch all cats from the realm
                val cats: RealmResults<Cat> = this.query<Cat>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(cats)
            }

            // :snippet-start: create-uuid-random
            realm.write {
                this.copyToRealm(Cat().apply {
                    _id = RealmUUID.random()
                })
            }
            // :snippet-end:

            // :snippet-start: create-uuid-from-string
            realm.write {
                this.copyToRealm(Cat().apply {
                    _id = RealmUUID.from("46423f1b-ce3e-4a7e-812f-004cf9c42d76")
                })
            }
            // :snippet-end:

            realm.close()
        }
    }
    @Test
    @kotlin.test.Ignore
    fun createRealmSetTypes() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog2::class, Snack::class))
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // :snippet-start: add-item-to-realm-set
            realm.write {
                // create a Frog object named 'Kermit' that will have a RealmSet of favorite snacks
                val frog = this.copyToRealm(Frog2().apply {
                    name = "Kermit"
                })
                // get the RealmSet of favorite snacks from the Frog object we just created
                val set = frog.favoriteSnacks

                // create a Snack object for the Frog to add to Kermit's favorite snacks
                val fliesSnack = this.copyToRealm(Snack().apply {
                    name = "flies"
                })

                // Add the flies to the RealmSet of Kermit's favorite snacks
                set.add(fliesSnack)
            }
            // :snippet-end:

            val myFrog = realm.query<Frog2>("name = 'Kermit'").first().find()
            val set = myFrog?.favoriteSnacks

            if (set != null) {
                assertEquals(1, set.size)

                // :snippet-start: add-all-to-realm-set
                realm.write {
                    val cricketsSnack = this.copyToRealm(Snack().apply {
                        name = "crickets"
                    })
                    val earthWormsSnack = this.copyToRealm(Snack().apply {
                        name = "earthworms"
                    })
                    val waxWormsSnack = this.copyToRealm(Snack().apply {
                        name = "waxworms"
                    })

                    set.addAll(setOf(cricketsSnack, earthWormsSnack, waxWormsSnack))
                }
                // :snippet-end:

                assertEquals(4, set.size)
            }

            val fliesSnack = realm.query<Snack>("name = 'flies'").first().find()
            val cricketsSnack = realm.query<Snack>("name = 'crickets'").first().find()
            val earthWormsSnack = realm.query<Snack>("name = 'earthworms'").first().find()
            val waxWormsSnack = realm.query<Snack>("name = 'waxworms'").first().find()


            if (set != null) {
                // :snippet-start: set-contains
                Log.v("Does Kermit eat earth worms?: ${set.contains(earthWormsSnack)}") // true
                // :snippet-end:


                // :snippet-start: set-contains-multiple-items
                val setOfFrogSnacks = setOf(cricketsSnack, earthWormsSnack, waxWormsSnack)
                val containsAllSnacks = set.containsAll(setOfFrogSnacks)
                Log.v("Does Kermit eat crickets, earth worms, and wax worms?: $containsAllSnacks") // true
                // :snippet-end:

                // :snippet-start: remove-item-from-set
                realm.write {
                    set.remove(fliesSnack)
                }
                // :snippet-end:

                // :snippet-start: remove-multiple-items-from-set
                realm.write {
                    set.removeAll(setOfFrogSnacks)
                }
                // :snippet-end:
            }


            // :snippet-start: react-to-changes-from-the-set
            val kermitFrog = realm.query<Frog2>("name = 'Kermit'").first().find()
            val job = CoroutineScope(Dispatchers.Default).launch {
                kermitFrog?.favoriteSnacks
                    ?.asFlow()
                    ?.collect() {
                        // Listen for changes to the RealmSet
                    }
            }
            // :snippet-end:

            // :snippet-start: cancel-job
            // :uncomment-start:
            // job.cancel()
            // :uncomment-end:
            // :snippet-end:
        }

    }

}
// :replace-end: