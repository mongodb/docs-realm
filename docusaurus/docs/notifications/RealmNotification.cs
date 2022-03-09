// Observe realm notifications.
realm.RealmChanged += (sender, eventArgs) =>
{
    // sender is the realm that has changed.
    // eventArgs is reserved for future use.
    // ... update UI ...
}
