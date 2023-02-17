<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: {type: 'openImmediately'},
    existingRealmFileBehavior: {type: 'openImmediately'},
    onError: console.error,
  }}>
  <MyApp />
</RealmProvider>
