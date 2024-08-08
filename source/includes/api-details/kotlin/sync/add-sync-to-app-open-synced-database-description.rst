For our example app, we pass our ``config`` object to 
``realm.open()`` to open a synced database, then wait for 
our subscriptions to sync with the backend.

Because we have Development Mode enabled, Device Sync
automatically adds the following as queryable fields based on 
our initial subscription:

- ``_id`` (always included)
- ``ownerId``
- ``complete``
