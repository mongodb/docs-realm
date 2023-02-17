<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior,
    onError: console.error,
  }}
  fallback={
    <>
      {console.log(
        `::REALMPROVIDER:: falling back at ${performance.now()}`,
      )}
    </>
  }>
  <MyApp />
</RealmProvider>
