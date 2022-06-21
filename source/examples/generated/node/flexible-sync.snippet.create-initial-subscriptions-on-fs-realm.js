const config = {
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm.objects("Team").filtered("name == 'Developer Education'")
        );
      },
    },
  },
};
const realm = await Realm.open(config);
