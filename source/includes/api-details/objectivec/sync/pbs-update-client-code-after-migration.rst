- Switch to a :objc-sdk:`RLMUser -flexibleSyncConfiguration
  <Classes/RLMUser.html#/c:objc(cs)RLMUser(im)flexibleSyncConfiguration>`
  where you :ref:`open a synced database
  <sdks-configure-and-open-synced-database>`.
- Add relevant properties to your object models to use in your Flexible Sync 
  subscriptions. For example, you might add an ``ownerId`` property to enable
  a user to sync only their own data.
- Remove automatic Flexible Sync subscriptions and manually create the 
  relevant subscriptions.
