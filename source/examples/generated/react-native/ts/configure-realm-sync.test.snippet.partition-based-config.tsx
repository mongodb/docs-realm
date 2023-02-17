<RealmProvider
  sync={{
    partitionValue: 'testPartition',
    onError: console.error,
  }}>
  <MyApp />
</RealmProvider>
