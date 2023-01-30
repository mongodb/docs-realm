// Unsubscribe from notifications on a
// collection of realm objects
realm.All<Item>().AsRealmCollection()
    .CollectionChanged -= OnItemsChangedHandler;

// Unsubscribe from notifications on a
// collection property
items.AsRealmCollection().CollectionChanged -= OnItemsChangedHandler;
