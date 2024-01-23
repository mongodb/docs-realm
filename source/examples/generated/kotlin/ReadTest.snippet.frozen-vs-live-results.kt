// 'Realm.query()' always returns frozen results
val frozenResults = realm.query<Frog>("age > $0", 50).find()
// If you try to modify the queried object, SDK throws 'IllegalStateException'
frozenResults.first().age += 1

// 'MutableRealm.query()' returns live results
// Open a write transaction to access the MutableRealm
realm.write { // this: MutableRealm
    val liveResults = this.query<Frog>("age > $0", 50).find()
    // You can modify queried object
    liveResults.first().age += 1
}
