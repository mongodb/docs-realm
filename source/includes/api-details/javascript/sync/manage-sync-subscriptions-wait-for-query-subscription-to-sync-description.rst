When you call the ``.subscribe()`` method on a query, you can optionally
specify the ``WaitForSync`` behavior, which is an enum of options describing
different sync behaviors.

The supported ``WaitForSync`` options are:

- ``FirstTime``: Wait for sync to finish when a subscription is first created.
- ``Always``: Wait to download matching objects every time your app launches.
  The app must have an internet connection at every launch.
- ``Never``: Never wait to download matching objects. The app needs an internet
  connection for the user to authenticate the first time the app launches, but
  can :ref:`open offline <sdks-open-synced-database-offline>` on subsequent 
  launches using cached credentials.

You can optionally specify a ``timeout`` value to limit how long the sync 
download runs.
