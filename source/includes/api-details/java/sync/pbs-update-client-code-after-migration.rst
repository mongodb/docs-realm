- Update your :java-sdk:`SyncConfiguration.Builder 
  <io/realm/mongodb/sync/SyncConfiguration.Builder.html>` to use 
  :ref:`Flexible Sync <sdks-configure-and-open-synced-database>`. This involves
  removing the ``partitionValue`` and adding a set of initial subscriptions, 
  if needed.
- Add relevant properties to your object models to use in your Flexible Sync 
  subscriptions. For example, you might add an ``ownerId`` property to enable
  a user to sync only their own data.
- Remove automatic Flexible Sync subscriptions. If you did not add initial 
  subscriptions in the ``SyncConfiguration.Builder``, manually create the
  relevant subscriptions.
