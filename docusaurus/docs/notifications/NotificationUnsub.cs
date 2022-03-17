private IQueryable<Task> tasks;

public void LoadUI()
{
    tasks = realm.All<Task>();

    // Subscribe for notifications - since tasks is IQueryable<Task>, we're
    // using the AsRealmCollection extension method to cast it to IRealmCollection
    tasks.AsRealmCollection().CollectionChanged += OnTasksChanged;
}

public void UnloadUI()
{
    // Unsubscribe from notifications
    tasks.AsRealmCollection().CollectionChanged -= OnTasksChanged;
}

private void OnTasksChanged(object sender, NotifyCollectionChangedEventArgs args)
{
    // Do something with the notification information
}