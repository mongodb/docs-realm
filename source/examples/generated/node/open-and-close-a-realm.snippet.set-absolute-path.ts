const app = new Realm.App({ id: REALM_APP_ID, baseFilePath: customPath });
const user = await app.logIn(Realm.Credentials.anonymous());

const realm = await Realm.open({
  schema: [Car],
  sync: {
    flexible: true,
    user,
  },
});
