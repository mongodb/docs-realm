To add a subscription:

1. Open the synced database.
#. Access the database's :js-sdk:`realm.subscriptions 
   <classes/Realm-1.html#subscriptions>` property.
#. Open a subscription ``update`` block.
#. Create a subscription to a specific object type. Optionally add a query to
   subscribe to only a subset of the objects that match the query.
#. Call the ``add()`` method with the subscription you just created
   to append the new subscription to the subscription set. Optionally, you can
   name the subscription.
