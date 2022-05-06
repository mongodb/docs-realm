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
