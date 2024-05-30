Once you have enabled Device Sync and authenticated a user,
create a :flutter-sdk:`Configuration.flexibleSync() <realm/Configuration/flexibleSync.html>`
object. Then, pass the configuration to :flutter-sdk:`Realm() <realm/Realm-class.html>`
to open an instance of the database. The synced database **must** have a
different :flutter-sdk:`Configuration.path <realm/Configuration/path.html>`
from other opened non-synced databases.

.. literalinclude:: /examples/generated/flutter/quick_start_sync_test.snippet.open-sync-realm.dart
   :language: dart

Now create a subscription to synchronize data with Atlas using Device Sync.
Add the subscription within the :flutter-sdk:`SubscriptionSet.update() <realm/SubscriptionSet/update.html>`
callback function.

The update block callback function, includes a :flutter-sdk:`MutableSubscriptionSet()
<realm/MutableSubscriptionSet-class.html>` object as an argument.
Use ``MutableSubscriptionSet.add()`` to add a new subscription.
