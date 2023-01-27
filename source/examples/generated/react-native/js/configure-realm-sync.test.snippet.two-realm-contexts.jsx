function AppWrapperTwoRealms() {
  const {RealmProvider} = RealmContext;
  const {SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{flexible: true, onError: error => console.error(error)}}>
          <MyApp />
        </RealmProvider>
        <SecondRealmProvider>
          <MyApp />
        </SecondRealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
