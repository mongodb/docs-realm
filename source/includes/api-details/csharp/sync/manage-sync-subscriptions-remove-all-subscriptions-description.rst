Within an update block, you can remove all subscriptions from the
subscriptions set. Call the :dotnet-sdk:`RemoveAll()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_RemoveAll_System_Boolean_>`
method on the ``SubscriptionSet``.

By default, the ``RemoveAll()`` method only removes unnamed subscriptions. 
Set the optional ``removedName`` boolean to ``true`` to also remove named
subscriptions.
