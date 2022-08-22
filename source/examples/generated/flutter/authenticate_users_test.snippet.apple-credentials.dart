Credentials appleCredentials = Credentials.apple(idToken);
User currentUser = await app.logIn(appleCredentials);
