const app = new Realm.App({
  id: "flexsyncjstest-smixl", // Replace with your AppID
});

await app.logIn(Realm.Credentials.anonymous());

const config = {
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm.objects("Task").filtered(`owner_id = ${app.currentUser.id}`)
        );
      },
    },
  },
};
const realm = await Realm.open(config);
