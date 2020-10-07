User jwtUser =
    await app.LogInAsync(Credentials.JWT(jwt_token));