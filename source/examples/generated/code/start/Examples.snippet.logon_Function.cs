var functionParameters = new
{
    username = "caleb",
    password = "shhhItsASektrit!",
    IQ = 42,
    isCool = false
};

var user =
    await app.LogInAsync(Credentials.Function(functionParameters));