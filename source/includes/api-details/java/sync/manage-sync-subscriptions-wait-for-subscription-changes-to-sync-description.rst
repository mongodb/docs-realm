Use the :java-sdk:`waitForInitialRemoteData()
<io/realm/mongodb/sync/SyncConfiguration.Builder.html#waitForInitialRemoteData(long,java.util.concurrent.TimeUnit)>`
builder method to force your application to block until client subscription
data synchronizes to the backend before opening the database.

Alternately, you could use :java-sdk:`SubscriptionSet.waitForSynchronization()
<io/realm/mongodb/sync/SubscriptionSet.html#waitForSynchronization(java.lang.Long,java.util.concurrent.TimeUnit)>`
or :java-sdk:`SubscriptionSet.waitForSynchronizationAsync()
<io/realm/mongodb/sync/SubscriptionSet.html#waitForSynchronizationAsync(java.lang.Long,java.util.concurrent.TimeUnit,io.realm.mongodb.sync.SubscriptionSet.StateChangeCallback)>`
to delay execution until subscription sync completes after instantiating
a sync connection.
