init {
    require(RealmObject.isManaged(obj)) { "LiveRealmObject only supports managed RealmModel instances!" }
    require(RealmObject.isValid(obj)) { "The provided RealmObject is no longer valid, and therefore cannot be observed for changes." }
    if (RealmObject.isLoaded(obj)) {
        // we should not notify observers when results aren't ready yet (async query).
        // however, synchronous query should be set explicitly.
        setValue(obj)
    }
}