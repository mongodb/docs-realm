When you call the ``.subscribe()`` method on a query, you can optionally
specify the ``WaitForSync`` behavior, which is an enum of options describing
different sync behaviors.

This example uses the ``FirstTime`` option, which is the default behavior.
A subscription with ``FirstTime`` behavior only waits for sync to finish when a
subscription is first created.

.. literalinclude:: /examples/generated/node/v12/manage-subscriptions.test.snippet.sub-wait-first.ts
   :language: typescript

The other supported ``WaitForSync`` options are:

- ``Always``: Wait to download matching objects every time your app launches.
  The app must have an internet connection at every launch.
- ``Never``: Never wait to download matching objects. The app needs an internet
  connection for the user to authenticate the first time the app launches, but
  can :ref:`open offline <sdks-open-synced-database-offline>` on subsequent 
  launches using cached credentials.

You can optionally specify a ``timeout`` value to limit how long the sync 
download runs.
