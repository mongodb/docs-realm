// Observe collection notifications. Retain the token to keep observing.
var token = _realm.All<Dog>().SubscribeForNotifications((sender, changes, error) =>
{
    foreach (var i in changes.DeletedIndices) {
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