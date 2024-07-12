Use the :dotnet-sdk:`SubscriptionSet.State
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_State>`
property to read the current state of the subscription set.

The ``Superseded`` state is a :dotnet-sdk:`SubscriptionSetState
<reference/Realms.Sync.SubscriptionSetState.html>` that can occur when another
thread updates a subscription on a different instance of the subscription set.
If the state becomes ``Superseded``, you must obtain a new instance of the
subscription set before you can update it.
