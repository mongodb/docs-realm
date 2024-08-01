Use the :kotlin-sync-sdk:`SyncConfiguration.waitForInitialRemoteData()
<io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/wait-for-initial-remote-data.html>`
builder method to force your application to block until client subscription
data synchronizes to the backend before opening the database.

Alternately, you can use :kotlin-sync-sdk:`SubscriptionSet.waitForSynchronization()
<io.realm.kotlin.mongodb.sync/-subscription-set/wait-for-synchronization.html>`
to delay execution until subscription sync completes after instantiating
a sync connection.

