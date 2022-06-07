package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.types.ObjectId
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.datetime.Instant


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
    val fishes: List<Fish> = listOf()
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

class SchemaTest: RealmTest() {

}