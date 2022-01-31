realm.Subscriptions.Update(() =>
{
    // remove all Team subscriptions
    realm.Subscriptions.RemoveAll("Team");
});
