<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior,
    onError: error => console.error(error),
  }}>
  <MyApp />
</RealmProvider>
