val realm = Realm.getInstance(config)

// Get an immutable copy of the realm that can be passed across threads
val frozenRealm = realm.freeze()
assert(frozenRealm.isFrozen)
val frogs = realm.where(Frog::class.java).findAll()
// You can freeze collections
val frozenFrogs = frogs.freeze()
assert(frozenFrogs.isFrozen)

// You can still read from frozen realms
val frozenFrogs2 =
    frozenRealm.where(Frog::class.java).findAll()
assert(frozenFrogs2.isFrozen)
val frog: Frog = frogs.first()!!
assert(!frog.realm.isFrozen)

// You can freeze objects
val frozenFrog: Frog = frog.freeze()
assert(frozenFrog.isFrozen)
assert(frozenFrog.realm.isFrozen)
