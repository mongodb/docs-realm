package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.log.RealmLogger
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Instant
import kotlin.test.Test
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "Frog2": "Frog"
//    }
// }

// :snippet-start: primary-key
class Lizard: RealmObject {
    @PrimaryKey
    val _id: ObjectId = ObjectId.create()
}
// :snippet-end:

// :snippet-start: ignore
class ShoppingCart: RealmObject {
    val _id: ObjectId = ObjectId.create()
    @Ignore
    val items: List<String> = listOf()
}
// :snippet-end:

// :snippet-start: index
class Movie: RealmObject {
    @Index
    val _id: ObjectId = ObjectId.create()
    val starring: List<String> = listOf()
}
// :snippet-end:

class Fish: RealmObject {
    val _id: ObjectId = ObjectId.create()
}

// :snippet-start: to-many-relationship
class Sushi: RealmObject {
    val _id: ObjectId = ObjectId.create()
    val name: String = ""
    val fishes: RealmList<Fish> = realmListOf<Fish>()
}
// :snippet-end:

// :snippet-start: to-one-relationship
class SushiPlatter: RealmObject {
    val _id: ObjectId = ObjectId.create()
    val name: String = ""
    val fish: Fish? = null
}
// :snippet-end:

class Horse: RealmObject {
    val _id: ObjectId = ObjectId.create()
}

// :snippet-start: optional
class Knight: RealmObject {
    val _id: ObjectId = ObjectId.create()
    val name: String = ""
    val mount: Horse? = null
}
// :snippet-end:

// :snippet-start: define-a-realm-set
class Frog2 : RealmObject {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> = realmSetOf<Snack>()  // realmSetOf(Snack()) // RealmSet<Snack>();
}

class Snack : RealmObject {
    var name: String? = null
}
// :snippet-end:

// :snippet-start: timestamp-workaround
// model class that stores an Instant (kotlinx-datetime) field as a RealmInstant via a conversion
class RealmInstantConversion: RealmObject {
    private var _timestamp: RealmInstant = RealmInstant.from(0, 0)
    public var timestamp: Instant
        get()
        { return _timestamp.toInstant() }

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
    }

    else {
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
    }

    else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        RealmInstant.from(sec + 1, -1_000_000 + nano)
    }
}
// :snippet-end:

class SchemaTest: RealmTest() {

    @Test
    fun createRealmSetTypes() {
        runBlocking{
            val config = RealmConfiguration.Builder(setOf(Frog2::class, Snack::class))
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                val frog = this.copyToRealm(Frog2().apply {
                    name = "Kermit"
                })
                // :snippet-start: add-item-to-realm-set
                val set = frog.favoriteSnacks // get the RealmSet field from the object we just created

                val fliesSnack = this.copyToRealm(Snack().apply {
                    name = "flies"
                })

                set.add(fliesSnack)
                // :snippet-end:

                assertEquals(1, set.size)

                // :snippet-start: add-all-to-realm-set
                val cricketsSnack = this.copyToRealm(Snack().apply {
                    name = "crickets"
                })
                val earthWormsSnack = this.copyToRealm(Snack().apply {
                    name = "earth worms"
                })
                val waxWormsSnack = this.copyToRealm(Snack().apply {
                    name = "wax worms"
                })

                set.addAll(setOf(cricketsSnack,earthWormsSnack,waxWormsSnack))
                // :snippet-end:

                assertEquals(4, set.size)

                // :snippet-start: set-contains
                Log.v("Does Kermit eat earth worms?: ${set.contains(earthWormsSnack)}")
                // :snippet-end:

                // :snippet-start: set-contains-multiple-items
                val setOfFrogSnacks = setOf(cricketsSnack,earthWormsSnack,waxWormsSnack)
                Log.v("Does Kermit eat crickets, earth worms, and wax worms?: ${set.containsAll(setOfFrogSnacks)}")
                // :snippet-end:

                // :snippet-start: remove-item-from-set
                set.remove(fliesSnack)
                // :snippet-end:

                // :snippet-start: remove-multiple-items-from-set
                set.removeAll(setOfFrogSnacks)
                // :snippet-end:

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
            }



        }

    }

}
// :replace-end: