var token = fido.Owners.SubscribeForNotifications((sender, changes, error) =>
{
    if (error != null) return;
    if (changes == null) return;

    if (changes.IsCleared)
    {
        // ... handle collection has been cleared ...
    }
});
