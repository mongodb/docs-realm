Within an update block, you can remove all unnamed subscriptions from the
subscriptions set. Call the :dotnet-sdk:`RemoveAll()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_RemoveAll_System_Boolean_>`
method on the ``SubscriptionSet``, with the optional boolean ``removedName``
argument set to false. This removes only unnamed subscriptions.
