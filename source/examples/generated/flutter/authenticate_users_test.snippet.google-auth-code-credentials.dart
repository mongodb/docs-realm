Credentials googleAuthCodeCredentials =
    Credentials.googleAuthCode(authCode);
User currentUser = await app.logIn(googleAuthCodeCredentials);
