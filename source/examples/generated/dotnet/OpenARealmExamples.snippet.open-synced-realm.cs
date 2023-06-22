user = await app.LogInAsync(
    Credentials.EmailPassword("caleb@mongodb.com", "MySekritPwd"));
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
