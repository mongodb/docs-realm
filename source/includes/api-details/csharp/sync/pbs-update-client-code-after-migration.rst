- Change your 
  :dotnet-sdk:`PartitionSyncConfiguration <reference/Realms.Sync.PartitionSyncConfiguration.html>`
  to a
  :dotnet-sdk:`FlexibleSyncConfiguration <reference/Realms.Sync.FlexibleSyncConfiguration.html>`.
- Add relevant properties to your object models to use in your Flexible Sync 
  subscriptions. For example, you might add an ``ownerId`` property to enable
  a user to sync only their own data.
- Remove automatic Flexible Sync subscriptions and manually create the 
  relevant subscriptions.
