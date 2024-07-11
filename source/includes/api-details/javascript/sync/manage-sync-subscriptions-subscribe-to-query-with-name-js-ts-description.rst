To subscribe to a query:

#. Query for the objects that you want to read and write.
#. Call ``subscribe()`` on the query results to create a sync subscription for
   objects matching the query.
#. Pass a ``SubscriptionOptions`` object that contains the ``name`` property to
   ``subscribe()``.
