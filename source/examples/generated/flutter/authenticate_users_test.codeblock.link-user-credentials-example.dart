// on app start without registration
User anonymousUser = await app.logIn(Credentials.anonymous());

// ... user interacts with app

//... user decides to sign up for app with email/password auth
EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.registerUser(USERNAME, PASSWORD);

// link email/password credentials to anonymous user's credentials
User linkedCredentialUser = await anonymousUser
    .linkCredentials(Credentials.emailPassword(USERNAME, PASSWORD));
