auto realm = db(std::move(config));

// Get an immutable copy of the realm that can be passed across threads
auto frozenRealm = realm.freeze();

if (frozenRealm.is_frozen()) {
    // Do something with the frozen realm.
    // You may pass a frozen realm, collection, or objects
    // across threads. Or you may need to `.thaw()`
    // to make it mutable again.
}

// You can freeze collections
auto managedItems = realm.objects<Item>();
auto frozenItems = managedItems.freeze();

CHECK(frozenItems.is_frozen());

// You can read from frozen realms
auto itemsFromFrozenRealm = frozenRealm.objects<Item>();

CHECK(itemsFromFrozenRealm.is_frozen());

// You can freeze objects
auto managedItem = managedItems[0];

CHECK(!managedItem.m_realm.is_frozen());

auto frozenItem = managedItem.freeze();

CHECK(frozenItem.is_frozen());

// Frozen objects have a reference to a frozen realm
CHECK(frozenItem.m_realm.is_frozen());
