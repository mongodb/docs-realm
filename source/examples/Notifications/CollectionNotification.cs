var token = realm.All<Person>().SubscribeForNotifications ((sender, changes, error) =>
{
    // Access changes.InsertedIndices, changes.DeletedIndices, and changes.ModifiedIndices
});

// Later, when you no longer wish to receive notifications
token.Dispose();
