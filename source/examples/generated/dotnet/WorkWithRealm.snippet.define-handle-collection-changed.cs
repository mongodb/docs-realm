private void HandleCollectionChanged(object sender,
    NotifyCollectionChangedEventArgs e)
{
    // Use e.Action to get the
    // NotifyCollectionChangedAction type.
    if (e.Action == NotifyCollectionChangedAction.Add)
    {
        // etc.
    }
}
