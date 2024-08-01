To subscribe to a ``RealmQuery`` or ``RealmResults`` set, call the
:kotlin-sync-sdk:`.subscribe() <io.realm.kotlin.mongodb.ext/subscribe.html>` method.

.. literalinclude:: /examples/generated/kotlin/SyncTest.snippet.subscribe-unnamed-query.kt
   :language: kotlin

Update a Query Subscription
```````````````````````````

You can update a named query subscription with a new query
by setting ``updateExisting`` to ``true``.

This updates the subscription automatically, instead of requiring you to  
:ref:`manually update the subscription <sdks-change-subscription-queries>`
in the subscription set.
