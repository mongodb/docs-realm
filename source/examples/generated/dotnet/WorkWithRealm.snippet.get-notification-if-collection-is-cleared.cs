var token = fido.Owners.SubscribeForNotifications(
    (sender, changes, error) =>
{
    if (error != null) return;
    if (changes == null) return;

    if (changes.IsCleared)
    {
        // All items in the collection have been deleted.
    }
});
