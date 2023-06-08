var functionParameters = new
{
    username = "caleb",
    password = "MySekritPwd",
    IQ = 42,
    isCool = false
};

var user =
    await app.LogInAsync(Credentials.Function(functionParameters));
