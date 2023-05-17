var dictionary = container.IntDictionary.AsRealmCollection();
dictionary.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
