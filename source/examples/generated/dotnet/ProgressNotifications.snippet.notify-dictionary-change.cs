var dictionary = container.IntDictionary.AsRealmCollection();

dictionary.CollectionChanged += (sender, e) =>
{
    Console.WriteLine($"Collection {sender} changed: {e.Action}");
    /* the event arg includes:
    e.Action,
    e.NewItems,
    e.OldItems,
    e.NewStartingIndex, and
    e.OldStartingIndex */
};

dictionary.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
