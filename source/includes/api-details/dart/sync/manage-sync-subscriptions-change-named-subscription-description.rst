You can update a named subscription with a new query. To update a subscription's
query, open an update block with ``SubscriptionSet.update()``.
In the callback function of the update block, pass the following arguments to ``MutableSubscriptionSet.add()``:

- The new query
- The name of the subscription that you want to update
- ``update: true``

In the following example, long trains are re-defined to be any trains that
have more than 10 cars.
