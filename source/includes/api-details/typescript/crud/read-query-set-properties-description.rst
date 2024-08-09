Sets allow you to perform math operations such as finding the union,
intersection, or difference between two sets. To learn more about performing
these operations, see the MDN docs for :mdn:`Implementing basic set operations
<Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations>`.

To determine if a set contains a particular value, pass the value to the
``<Realm.Set>.has()`` method. The ``set.has()`` method will return true if the
set contains the value specified.

To discover how many items are in a set, you can check the set's ``size``
property.

To traverse a set, use the ``<Realm.Set>.forEach()`` method or alternative
:mdn:`iteration method
<Web/JavaScript/Reference/Global_Objects/Set#iteration_methods>`. 

The order of the **Realm.Set** may be different from the order that the items
were added.

You can track the set order by updating an array when a new value is added.
