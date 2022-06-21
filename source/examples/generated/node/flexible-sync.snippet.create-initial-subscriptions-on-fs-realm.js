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
      rerunOnOpen: true,
    },
  },
};
const realm = await Realm.open(config);
