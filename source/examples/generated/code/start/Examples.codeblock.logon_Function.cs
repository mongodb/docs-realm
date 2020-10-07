var functionParameters = new
{
    username=  "caleb",
    password = "shhhItsASektrit!",
    IQ = 42,
    isCool = false
};

User functionUser =
    await app.LogInAsync(Credentials.Function(functionParameters));