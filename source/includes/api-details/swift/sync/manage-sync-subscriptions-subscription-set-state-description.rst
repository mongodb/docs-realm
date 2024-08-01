Use the :swift-sdk:`SubscriptionSet.state
<Structs/SyncSubscriptionSet.html#/s:10RealmSwift19SyncSubscriptionSetV5stateAA0cD5StateOvp>`
property to read the current state of the subscription set.

The ``superseded`` state is a :swift-sdk:`SyncSubscriptionState
<Enums/SyncSubscriptionState.html#/s:10RealmSwift21SyncSubscriptionStateO8completeyA2CmF>`
that can occur when another thread updates a subscription on a different
instance of the subscription set. If the state becomes ``superseded``, you must
obtain a new instance of the subscription set before you can update it.
