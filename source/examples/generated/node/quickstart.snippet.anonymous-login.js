const app = new Realm.App({
  id: "flexsyncjstest-smixl", // Replace with your AppID
});

await app.logIn(Realm.Credentials.anonymous());
