<RealmProvider
  sync={{
    flexible: true,
    initialSubscriptions: {
      update(subs, realm) {
        subs.add(realm.objects(Cat));
      },
    },
    onError: console.log,
  }}>
  <SubscriptionManager />
</RealmProvider>
