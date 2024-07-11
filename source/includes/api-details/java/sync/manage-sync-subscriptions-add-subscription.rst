To add a subscription:

1. Open the synced database.
#. Call the ``getSubscriptions()`` method to interact with the subscription set.
#. Open a subscription ``update`` block using
   :java-sdk:`SubscriptionSet.update()
   <io/realm/mongodb/sync/SubscriptionSet.html#update(io.realm.mongodb.sync.SubscriptionSet.UpdateCallback)>`.
#. Use the :java-sdk:`MutableSubscriptionSet.addOrUpdate()
   <io/realm/mongodb/sync/MutableSubscriptionSet.html#addOrUpdate(io.realm.mongodb.sync.Subscription)>`
   method to append the new subscription to the subscription set.
#. Call ``Subscription.create()`` with a query to a specific object type.
   Optionally, add a name for the query.
