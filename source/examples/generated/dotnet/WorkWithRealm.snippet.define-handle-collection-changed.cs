private void HandleCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
{
    if(e.Action == NotifyCollectionChangedAction.Reset)
    {
        // ... handle a CollectionChanged Event with action `Reset`
    }
}
