    realm.Write(() =>
{
    // Remove all of Ali's dogs.
    realm.RemoveRange<Dog>(ali.Dogs);

    // Remove Ali.
    realm.Remove(ali);
});
