var functionParameters = new Dictionary<string, string>()
{
    { "username", "caleb" },
    { "password", "shhhItsASektrit!" },
    { "someOtherProperty", "cheesecake" }
};
Realms.Sync.User functionUser =
    await app.LogInAsync(Credentials.Function(functionParameters));