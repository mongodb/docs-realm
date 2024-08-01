Within an update block, you can remove an unnamed subscription by its query.
Pass the query to the :dotnet-sdk:`Remove()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_Remove__1_System_Linq_IQueryable___0__System_Boolean_>`
method on the ``SubscriptionSet``.

In the following example, the subscription to tasks with an owner named 'Ben' is
removed from the subscriptions set.
