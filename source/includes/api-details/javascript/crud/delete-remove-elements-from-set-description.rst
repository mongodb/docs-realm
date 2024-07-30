To remove a specific value from a set, pass the value to the
``<Realm.Set>.delete()`` method within a write transaction.

.. literalinclude:: /examples/generated/node/data-types.snippet.remove-specific-item-from-set.js
   :language: javascript

To remove all items from the set, run the ``<Realm.Set>.clear()`` method within
a write transaction.
