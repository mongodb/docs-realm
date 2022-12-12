// Initialize your App.
const app = new Realm.App({
  id: "YOUR_APP_ID",
});

// Authenticate an anonymous user.
await app.logIn(Realm.Credentials.anonymous());
