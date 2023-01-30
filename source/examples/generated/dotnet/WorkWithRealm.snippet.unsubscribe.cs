// Subscribe for notifications
items.AsRealmCollection().CollectionChanged += OnItemsChangedHandler;

// Unsubscribe from notifications
items.AsRealmCollection().CollectionChanged -= OnItemsChangedHandler;
