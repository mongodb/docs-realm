// Expose a sync realm
function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Profile'));
              },
            },
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
