To add a subscription:

1. Open the synced database.
#. Access the database's ``subscriptions`` property to interact with the
   :flutter-sdk:`SubscriptionSet <realm/SubscriptionSet-class.html>`.
#. Open a subscription ``update`` block by calling 
   :flutter-sdk:`SubscriptionSet.update() <realm/SubscriptionSet/update.html>`.
#. Call the ``add`` method to append the new subscription to the
   subscription set.
#. Pass a ``RealmResults`` query that you can create using the
   :ref:`Realm Query Language query <rql>`. Optionally, add a query name.
