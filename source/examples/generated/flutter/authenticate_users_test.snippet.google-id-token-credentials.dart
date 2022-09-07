Credentials googleIdTokenCredentials = Credentials.googleIdToken(idToken);
User currentUser = await app.logIn(googleIdTokenCredentials);
