package com.mongodb.realm.realmkmmapp

import io.realm.RealmInstant
import io.realm.RealmObject
import io.realm.annotations.Ignore
import io.realm.annotations.Index
import io.realm.annotations.PrimaryKey
import kotlin.random.Random
import java.time.Instant

// :code-block-start: primary-key
class Lizard: RealmObject {
    @PrimaryKey
    val _id: Long = Random.nextLong()
}
// :code-block-end:

// :code-block-start: ignore
class ShoppingCart: RealmObject {
    val _id: Long = Random.nextLong()
    @Ignore
    val items: List<String> = listOf()
}
// :code-block-end:

// :code-block-start: index
class Movie: RealmObject {
    @Index
    val _id: Long = Random.nextLong()
    val starring: List<String> = listOf()
}
// :code-block-end:

class Fish: RealmObject {
    val _id: Long = Random.nextLong()
}

// :code-block-start: to-many-relationship
class Sushi: RealmObject {
    val _id: Long = Random.nextLong()
    val name: String = ""
    val fishes: List<Fish> = listOf()
}
// :code-block-end:

// :code-block-start: to-one-relationship
class SushiPlatter: RealmObject {
    val _id: Long = Random.nextLong()
    val name: String = ""
    val fish: Fish? = null
}
// :code-block-end:

class Horse: RealmObject {
    val _id: Long = Random.nextLong()
}

// :code-block-start: optional
class Knight: RealmObject {
    val _id: Long = Random.nextLong()
    val name: String = ""
    val mount: Horse? = null
}
// :code-block-end:


// :code-block-start: timestamp-workaround
// model class that stores an Instant field as a RealmInstant via a conversion
class RealmInstantConversion: RealmObject {
    private var _timestamp: RealmInstant = RealmInstant.fromEpochSeconds(0, 0)
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
        Instant.ofEpochSecond(sec, nano.toLong())
    }

    else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        Instant.ofEpochSecond(sec - 1, 1_000_000 + nano.toLong())
    }
}

fun Instant.toRealmInstant(): RealmInstant {
    val sec: Long = this.epochSecond
    // The value is always positive and lies in the range `0..999_999_999`.
    val nano: Int = this.nano

    return if (sec >= 0) { // For positive timestamps, conversion can happen directly
        RealmInstant.fromEpochSeconds(sec, nano)
    }

    else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        RealmInstant.fromEpochSeconds(sec + 1, -1_000_000 + nano)
    }
}
// :code-block-end:

class SchemaTest: RealmTest() {

}