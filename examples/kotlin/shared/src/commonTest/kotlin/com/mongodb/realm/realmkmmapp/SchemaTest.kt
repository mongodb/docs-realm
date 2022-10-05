package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.query.RealmSingleQuery
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Instant
import kotlin.test.Test
import kotlin.test.assertEquals


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

// Circular dependencies with sets
class SetLevel1 : RealmObject {
    var name: String = ""
    var set: RealmSet<SetLevel2> = realmSetOf()
}

class SetLevel2 : RealmObject {
    var name: String = ""
    var set: RealmSet<SetLevel3> = realmSetOf()
}

class SetLevel3 : RealmObject {
    var name: String = ""
    var set: RealmSet<SetLevel1> = realmSetOf()
}
class Character: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId.create()
    var name: String = ""
    var levelsCompleted: RealmSet<Int> = realmSetOf()
    var inventory: RealmSet<String> = realmSetOf()
}

class SchemaTest: RealmTest() {

    @Test
    fun createRealmSetTypes() {

        runBlocking{
            val config = RealmConfiguration.Builder(setOf(Character::class))
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // :snippet-start: create-realm-set
            realm.write {
                this.copyToRealm(Character().apply {
                    name = "PlayerOne"
                    levelsCompleted = realmSetOf(4,9)
                    inventory = realmSetOf("elixir","compass", "glowing shield")
                })

                this.copyToRealm(Character().apply {
                    name = "PlayerTwo"
                    levelsCompleted = realmSetOf(1,2,5,24)
                    inventory = realmSetOf("estus flask", "gloves", "rune")
                })
            }
            // :snippet-end:

            // :snippet-start: add-items-to-realm-set
            val playerOne: Character =
                realm.query<Character>("name = 'PlayerOne'").find().first()

            realm.write {
                set.add(RealmSetContainer().apply { stringField = "Dummy" })

                
                playerOne.inventory.add(Character().apply {})
                playerOne.inventory.add("hammer")
                playerOne.levelsCompleted.add(32)
            }
            // :snippet-end:
//
//            // :snippet-start: check-if-set-contains
//            val playerTwo: Character =
//                realm.query<Character>("name = 'PlayerTwo'").find().first()
//            // check if playerTwo has completed level 3 by calling the `contains()` method
//            // on the Realm Set object
//            val playerTwoHasCompletedLevelThree = playerTwo.levelsCompleted.contains(3)
//            Log.v("Is level three completed by playerTwo: $playerTwoHasCompletedLevelThree")
//            // :snippet-end:
//
//            // :snippet-start: check-set-size
//            // check how many items playerTwo has in his inventory through the `count()`
//            // method of the Realm Set object
//            val playerTwoInventorySize = playerTwo.inventory.count()
//            Log.v("playerTwo has $playerTwoInventorySize inventory items")
//            // :snippet-end:
//
//            // :snippet-start: remove-item-from-set
//            // remove the compass from playerOne's inventory by calling the
//            // `remove()` method of the Realm Set object within a write transaction
//            realm.write {
//                playerOne.inventory.remove("compass")
//            }
//            // :snippet-end:
//
//            // :snippet-start: remove-all-items-from-set
//            realm.write {
//                // clear all data from the inventory slot of playerTwo by calling
//                // the `removeAll()` method of the Realm Set object in a write transaction
//                playerTwo.inventory.removeAll(playerTwo.inventory)
//            }
//            // :snippet-end:
//
//            // :snippet-start: iterate-over-set
//            val iterate = playerOne.inventory.iterator()
//            while(iterate.hasNext()){
//                Log.v(iterate.next())
//            }
//            // :snippet-end:

        }

    }

//    val child = Sample().apply {
//        intField = 2
//        nullableObject = leaf
//        objectSetField = realmSetOf(leaf, leaf)
//    }
//    realm.writeBlocking {
//        copyToRealm(Sample()).apply {
//            objectSetField.add(child)
//        }
//    }

}
