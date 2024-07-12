Use the :kotlin-sync-sdk:`SubscriptionSet.state
<io.realm.kotlin.mongodb.sync/-subscription-set/index.html#-508547000%2FProperties%2F645295071>`
property to read the current state of the subscription set.

``SUPERCEDED`` (sic -- note alternate spelling) is a :kotlin-sync-sdk:`SubscriptionSetState
<io.realm.kotlin.mongodb.sync/-subscription-set-state/index.html>`
that can occur when another thread writes a subscription on a different instance
of the subscription set. If the state becomes ``SUPERCEDED``, you must obtain a
new instance of the subscription set before you can write to it.
