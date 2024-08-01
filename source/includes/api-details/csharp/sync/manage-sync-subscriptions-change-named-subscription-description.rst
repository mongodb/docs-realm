You can update a named subscription with a new query. To update a subscription's
query, pass the new query and a subscription option with the name of the
subscription that you want to update to the
``SubscriptionSet.Add()`` method. Like adding a new subscription,
you must update a subscription within an update block by calling
``SubscriptionSet.Update()`` method.

The ``SubscriptionOptions.UpdateExisting`` field must be set to ``true``, or
else attempting to change the subscription throws an exception.

In the following example, long running tasks are re-defined to be any tasks that
have taken more than 130 minutes.
