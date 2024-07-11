To add a subscription:

1. Open the synced database.
#. Access the database's ``subscriptions`` property.
#. Open a subscription ``update`` block.
#. Call the ``add`` method with the object type to append the new subscription
   to the subscription set. Optionally, add a query to subscribe to only a
   subset of the objects that match the query.

.. include:: /includes/note-cpp-supports-subset-of-rql.rst
