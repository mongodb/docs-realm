// Observe collection notifications. Retain the token to keep observing.
var token = realm.All<Dog>()
    .SubscribeForNotifications((sender, changes, error) =>
{
    if (error != null)
    {
        // Show error message
        return;
    }

    if (changes == null)
    {
        // This is the case when the notification is called
        // for the first time.
        // Populate tableview/listview with all the items
        // from `collection`
        return;
    }

    // Handle individual changes

    foreach (var i in changes.DeletedIndices)
    {
        // ... handle deletions ...
    }

    foreach (var i in changes.InsertedIndices)
    {
        // ... handle insertions ...
    }

    foreach (var i in changes.NewModifiedIndices)
    {
        // ... handle modifications ...
    }
});

// Later, when you no longer wish to receive notifications
token.Dispose();
