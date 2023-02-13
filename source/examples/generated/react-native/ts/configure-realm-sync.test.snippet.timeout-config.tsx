function AppWrapperTimeoutSync() {
  const {RealmProvider} = RealmContext;
  const realmAccessBehavior = {
    type: 'downloadBeforeOpen',
    timeOut: 1000,
    timeOutBehavior: 'openLocalRealm',
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
