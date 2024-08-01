To add a subscription:

1. Open the synced database.
#. Access the database's ``subscriptions`` property.
#. Open a subscription ``update`` block.
#. Call the ``append`` method to append the new subscription to the
   subscription set.
#. Pass a ``QuerySubscription<ObjectTypeName>`` with the name of the object
   type. Optionally, use the ``.where`` or ``NSPredicate`` query API to
   subscribe to only a subset of the objects of the type.
