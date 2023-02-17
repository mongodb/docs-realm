<RealmProvider
  sync={{
    flexible: true,
    newRealmFileBehavior: {type: 'openImmediately'},
    existingRealmFileBehavior: {type: 'openImmediately'},
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
