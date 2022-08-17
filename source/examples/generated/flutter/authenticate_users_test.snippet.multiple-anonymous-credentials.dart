User anonUser = await app.logIn(Credentials.anonymous());

User otherAnonUser =
    await app.logIn(Credentials.anonymous(reuseCredentials: false));
