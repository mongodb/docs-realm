    var theKing = realm.All<Person>()
        .FirstOrDefault(p => p.Name == "Elvis Presley");

    theKing.PropertyChanged += (sender, eventArgs) =>
    {
        Debug.WriteLine("New value set for The King: " +
            eventArgs.PropertyName);
    };
}
