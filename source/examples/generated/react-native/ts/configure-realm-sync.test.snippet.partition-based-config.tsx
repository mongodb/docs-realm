<RealmProvider
  sync={{
    partitionValue: 'testPartition',
    onError: error => console.error(error),
  }}>
  <MyApp />
</RealmProvider>
