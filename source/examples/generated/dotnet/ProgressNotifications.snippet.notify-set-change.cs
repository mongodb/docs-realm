var stringSet = container.StringSet.AsRealmCollection();
stringSet.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
