user = await app.LogInAsync(
    Credentials.EmailPassword("foo@foo.com", "foobar"));
config = new PartitionSyncConfiguration("myPart", user);
try
{
    realm = await Realm.GetInstanceAsync(config);
}
catch (RealmFileAccessErrorException ex)
{
    Console.WriteLine($@"Error creating or opening the
        realm file. {ex.Message}");
}
