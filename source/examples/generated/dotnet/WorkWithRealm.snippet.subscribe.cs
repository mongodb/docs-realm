var token = fido.Owners.SubscribeForNotifications((sender, changes) =>
{
    if (changes == null) return;
});
token.Dispose();
