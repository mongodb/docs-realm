package com.mongodb.realm.realmkmmapp

//import kotlinx.coroutines.runBlocking
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.backlinks
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.SetChange
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.datetime.Instant
import org.mongodb.kbson.ObjectId
import kotlin.test.*

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
    fun createRealmSetTypes() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog2::class, Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: add-item-to-realm-set
            realm.write {
                // Create a Frog object named 'Kermit' that will have a RealmSet of favorite snacks
                val frog = copyToRealm(Frog2().apply {
                    name = "Kermit"
                })
                // Get the RealmSet of favorite snacks from the Frog object we just created
                val set = frog.favoriteSnacks

                // Create a Snack object for the Frog to add to Kermit's favorite snacks
                val fliesSnack = copyToRealm(Snack().apply {
                    name = "flies"
                })

                // Add the flies to the RealmSet of Kermit's favorite snacks
                set.add(fliesSnack)
                assertEquals(1, set.size) // :remove:
            }
            // :snippet-end:

            // :snippet-start: add-all-to-realm-set
            realm.write {
                val myFrog = query<Frog2>("name == $0", "Kermit").find().first()
                val set = findLatest(myFrog)!!.favoriteSnacks

                val cricketsSnack = copyToRealm(Snack().apply {
                    name = "crickets"
                })
                val earthWormsSnack = copyToRealm(Snack().apply {
                    name = "earthworms"
                })
                val waxWormsSnack = copyToRealm(Snack().apply {
                    name = "waxworms"
                })

                set.addAll(setOf(cricketsSnack, earthWormsSnack, waxWormsSnack))
                assertEquals(4, set.size) // :remove:
                // :uncomment-start:
                //}
                // :uncomment-end:
                // :snippet-end:

                // :snippet-start: set-contains
                Log.v("Does Kermit eat earthworms?: ${set.contains(earthWormsSnack)}") // true
                // :snippet-end:
                assertTrue(set.contains(earthWormsSnack))

                // :snippet-start: set-contains-multiple-items
                val containsAllSnacks = set.containsAll(set)
                Log.v("Does Kermit eat crickets, earthworms, and waxworms?: $containsAllSnacks") // true
                // :snippet-end:
                assertTrue(containsAllSnacks)

                // :snippet-start: remove-item-from-set
                val fliesSnack = query<Snack>("name == $0", "flies").first().find()

                set.remove(fliesSnack)
                // :snippet-end:
                assertFalse(set.contains(fliesSnack))

                // :snippet-start: remove-multiple-items-from-set
                val allSnacks = findLatest(myFrog)!!.favoriteSnacks

                set.removeAll(allSnacks)
                // :snippet-end:
            // TODO update test once https://github.com/realm/realm-kotlin/issues/1097 is fixed
                // assertTrue(set.isEmpty())
                set.removeAll(allSnacks) // have to call twice to actually remove all items until bug is fixed
                assertTrue(set.isEmpty())
            }
            realm.close()
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun listenForSetChanges() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog2::class, Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // capture changes to the set
            val detectedChanges = mutableListOf<SetChange<Snack>>()

            realm.writeBlocking {
                copyToRealm(Frog2().apply {
                    name = "Kermit"
                })
            }

            // :snippet-start: react-to-changes-from-the-set
            val kermitFrog = realm.query<Frog2>("name = $0", "Kermit").find().first()

            val job = launch(Dispatchers.Default) {
                kermitFrog.favoriteSnacks
                    .asFlow()
                    .collect {
                        // Listen for changes to the RealmSet
                        // :remove-start:
                        change ->
                        Log.v("Change detected: $change")
                        detectedChanges.add(change)
                        assertTrue(detectedChanges.size == 1)
                        // :remove-end:
                    }
            }
            // :snippet-end:
            realm.writeBlocking {
                val set = findLatest(kermitFrog)!!.favoriteSnacks
                val newSnack = copyToRealm(Snack().apply {
                    name = "chocolate"
                })
                set.add(newSnack)
            }
            job.cancel()
            realm.close()
            Realm.deleteRealm(config)
        }
    }
}

// :replace-end: