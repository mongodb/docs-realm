<RealmProvider
  schema={[Profile]}
  sync={{
    partitionValue: 'testPartition',
  }}>
  <RestOfApp />
</RealmProvider>
