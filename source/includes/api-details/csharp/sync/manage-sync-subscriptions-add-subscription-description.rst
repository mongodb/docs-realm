To add a subscription:

1. Open the synced database.
#. Access the database's :dotnet-sdk:`Realm.Subscriptions <reference/Realms.Realm.html#Realms_Realm_Subscriptions>` 
   property.
#. Open a subscription ``Update`` block.
#. Create a subscription to a specific object type. Optionally add a query to
   subscribe to only a subset of the objects that match the query.
#. Call the ``Subscriptions.Add`` method with the subscription you just created
   to append the new subscription to the subscription set.

Alternately, to add a subscription to an existing subscription set, create 
the query and then call :dotnet-sdk:`IQueryable.SubscribeAsync()
<reference/Realms.CollectionExtensions.html#Realms_CollectionExtensions_SubscribeAsync__1_System_Linq_IQueryable___0__Realms_Sync_SubscriptionOptions_Realms_Sync_WaitForSyncMode_System_Nullable_System_Threading_CancellationToken__>`.

The ``SubscribeAsync`` method is shorthand for using :dotnet-sdk:`SubscriptionSet.Update()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_Update_System_Action_>`
to create an update block, and then calling the :dotnet-sdk:`SubscriptionSet.Add()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_Add__1_System_Linq_IQueryable___0__Realms_Sync_SubscriptionOptions_>`
method on the ``SubscriptionSet``.
