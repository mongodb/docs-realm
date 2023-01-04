private IQueryable<Item> items;

public void LoadUI()
{
    items = realm.All<Item>();

    // Subscribe for notifications - since items is IQueryable<Item>, we're
    // using the AsRealmCollection extension method to cast it to IRealmCollection
    items.AsRealmCollection().CollectionChanged += OnItemsChanged;
}

public void UnloadUI()
{
    // Unsubscribe from notifications
    items.AsRealmCollection().CollectionChanged -= OnItemsChanged;
}

private void OnItemsChanged(object sender, NotifyCollectionChangedEventArgs args)
{
    // Do something with the notification information
}
