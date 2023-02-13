function AppWrapperPartitionSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            partitionValue: 'testPartition',
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
