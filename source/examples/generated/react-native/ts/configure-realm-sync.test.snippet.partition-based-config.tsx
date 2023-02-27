<RealmProvider
  sync={{
    partitionValue: 'testPartition',
    onError: console.error,
  }}>
  <RestOfApp />
</RealmProvider>
