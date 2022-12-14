final app = App(AppConfiguration(APP_ID));
await app.logIn(Credentials.anonymous());
// Refresh the user access token every 29 minutes, as the default expiration
// time for an access token is 30 minutes.
Timer.periodic(
    Duration(minutes: 29), (_) => app.currentUser?.refreshCustomData());
