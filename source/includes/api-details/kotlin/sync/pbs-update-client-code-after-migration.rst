- Update your :kotlin-sync-sdk:`SyncConfiguration.Builder()
  <io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/-builder.html>` 
  to use Flexible Sync where you :ref:`open a synced database
  <sdks-configure-and-open-synced-database>`. This involves removing the
  ``partitionValue`` and adding a set of initial subscriptions, if needed.
- Add relevant properties to your object models to use in your Flexible Sync 
  subscriptions. For example, you might add an ``ownerId`` property to enable
  a user to sync only their own data.
- Remove automatic Flexible Sync subscriptions and manually create the 
  relevant subscriptions.
