To add a subscription:

1. Open the synced database.
#. Access the database's ``subscriptions`` property.
#. Open a subscription ``update`` block.
#. Call the ``add`` method to append the new subscription to the
   subscription set.
#. Pass a query with the name of the object type. Optionally, use
   :ref:`Realm Query Language <rql>` to query only a subset of the objects.
   You can also add an optional query name.
