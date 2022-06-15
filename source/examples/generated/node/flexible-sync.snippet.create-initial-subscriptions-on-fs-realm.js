const realm = await Realm.open({
  schema: [TeamSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
  },
  initialSubscriptions: {
    update: (realm) => {
      realm.subscriptions.update((mutableSubs) => {
        mutableSubs.add(
          realm.objects("Team").filtered("name == 'Developer Education'")
        );
      });
    },
  },
});
