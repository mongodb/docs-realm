<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: {type: 'openImmediately'},
    existingRealmFileBehavior: {type: 'openImmediately'},
    onError: error => console.error(error),
  }}>
  <MyApp />
</RealmProvider>
