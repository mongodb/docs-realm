User currentUser = await app.logIn(credentials);
Configuration config = Configuration.flexibleSync(
    currentUser, [Tricycle.schema],
    path: 'flex.realm');
Realm realm = Realm(config);
