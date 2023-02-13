function AppWrapperOfflineSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {type: 'openImmediately'},
            existingRealmFileBehavior: {type: 'openImmediately'},
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
