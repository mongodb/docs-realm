const app = new Realm.App({ id: APP_ID, baseFilePath: absolutePath });
const user = await app.logIn(Realm.Credentials.anonymous());

const realm = await Realm.open({
  schema: [Car],
  sync: {
    flexible: true,
    user,
  },
});
