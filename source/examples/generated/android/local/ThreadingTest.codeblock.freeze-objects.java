Realm realm = Realm.getInstance(config);

// Get an immutable copy of the realm that can be passed across threads
Realm frozenRealm = realm.freeze();
assert(frozenRealm.isFrozen());

RealmResults<Frog> frogs = realm.where(Frog.class).findAll();
// You can freeze collections
RealmResults<Frog> frozenFrogs = frogs.freeze();
assert(frozenFrogs.isFrozen());

// You can still read from frozen realms
RealmResults<Frog> frozenFrogs2 = frozenRealm.where(Frog.class).findAll();
assert(frozenFrogs2.isFrozen());

Frog frog = frogs.first();
assert(!frog.getRealm().isFrozen());

// You can freeze objects
Frog frozenFrog = frog.freeze();
assert(frozenFrog.isFrozen());
// Frozen objects have a reference to a frozen realm
assert(frozenFrog.getRealm().isFrozen());
