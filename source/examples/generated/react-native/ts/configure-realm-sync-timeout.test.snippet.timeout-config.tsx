<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior,
    onError: console.error,
  }}>
  <MyApp />
</RealmProvider>
