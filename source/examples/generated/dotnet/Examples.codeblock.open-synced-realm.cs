config = new SyncConfiguration("myPart", user);
try
{
    realm = await Realm.GetInstanceAsync(config);
}
catch (RealmFileAccessErrorException ex)
{
    Console.WriteLine($@"There was an error creating the file
        specified in the Configuration. {ex.Message}");
}
