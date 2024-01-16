// 'Realm.query()' always returns frozen results
val realmQuery =
    realm.query<Frog>("age > $0", 50).find()
// Trying to modify a frozen object throws 'IllegalStateException'
realmQuery.first().age += 1

// Open a write transaction to access the MutableRealm
realm.write { // this: MutableRealm
    // 'MutableRealm.query()' returns live results
    val mutableRealmQuery =
        this.query<Frog>("age > $0", 50).find()
    // Can successfully modify queried object
    mutableRealmQuery.first().age += 1
}
