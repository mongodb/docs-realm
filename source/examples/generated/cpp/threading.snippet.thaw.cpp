// Read from a frozen realm
auto frozenItems = frozenRealm.objects<Item>();

// The collection that we pull from the frozen realm is also frozen
CHECK(frozenItems.is_frozen());

// To modify objects, you must first thaw them.
// Currently, you can thaw collections or realms.
auto thawedItems = frozenItems.thaw();

auto thawedItem = thawedItems[0];

// Check to make sure the item is valid. An object is
// invalidated when it is deleted from its managing realm,
// or when its managing realm has invalidate() called on it.
REQUIRE(thawedItem.is_invalidated() == false);

