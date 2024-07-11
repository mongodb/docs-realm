To subscribe to a query:

#. Query for the objects that you want to read and write.
#. Call ``subscribe()`` on the query results to create a sync subscription for
   objects matching the query.
#. Pass a ``SubscriptionOptions`` object.

Most of the time, you should give your subscriptions a name. If you don't, the
name is set to :mdn:`null <Web/JavaScript/Reference/Global_Objects/null>`.

If you use ``filtered()`` on an unnamed query subscription, the subscription
identifier is based on the ``filtered`` query. This means that every time your
query string changes, ``subscribe()`` will create a new subscription.
