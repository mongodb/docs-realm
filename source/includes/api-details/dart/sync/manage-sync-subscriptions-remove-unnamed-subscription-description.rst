Within an update block, you can remove a specific subscription by query.
Open an update block with ``SubscriptionSet.update()``. Pass the
``Subscription`` to :flutter-sdk:`MutableSubscriptionSet.removeByQuery()
<realm/MutableSubscriptionSet/removeByQuery.html>`.

In the following example, the subscription for all ``Plane`` objects is removed.
