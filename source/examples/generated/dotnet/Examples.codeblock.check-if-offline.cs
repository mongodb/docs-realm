if (app.CurrentUser == null)
{
    // App must be online for user to authenticate
    user = await app.LogInAsync(
        Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
    config = new SyncConfiguration("myPart", user);
    realm = await Realm.GetInstanceAsync(config);
}
else
{
    // This works whether online or offline
    user = app.CurrentUser;
    config = new SyncConfiguration("myPart", user);
    realm = Realm.GetInstance(config);
}
