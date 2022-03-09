var theKing = realm.All<Person>()
    .FirstOrDefault(p => p.Name == "Elvis Presley");

theKing.PropertyChanged += (s, e) =>
{
    Debug.WriteLine($"New value set for The King: {eventArgs.PropertyName}");
};