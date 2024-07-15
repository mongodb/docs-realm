You can remove a specific subscription by query by executing a transaction on
the subscriptions set. Pass the query to the :js-sdk:`remove()
<classes/MutableSubscriptionSet.html#remove>` method on the
``MutableSubscriptionSet`` within a transaction.

In the following example, the subscription to tasks with an owner named 'Ben' is
removed from the subscriptions set.
