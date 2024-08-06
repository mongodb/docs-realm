You can remove one or more elements in a single transaction from a 
:kotlin-sdk:`RealmSet <io.realm.kotlin.types/-realm-set/index.html>`:

- To remove one element from the set, pass the element 
  you want to delete to 
  :kotlin-sdk:`set.remove() <io.realm.kotlin.types/-realm-set/index.html#-1503494415%2FFunctions%2F878332154>`.
- To remove multiple elements from the set, pass the 
  elements you want to delete to
  :kotlin-sdk:`set.removeAll() <io.realm.kotlin.types/-realm-set/index.html#430447804%2FFunctions%2F878332154>`.

You can also remove *all* set elements at once by calling
:kotlin-sdk:`set.clear() <io.realm.kotlin.types/-realm-set/index.html#-767459876%2FFunctions%2F878332154>`.

In the following example, we have a ``Frog`` object with a set of 
``Snack`` objects. We remove the set elements in a series of operations until the
set is empty:

.. literalinclude:: /examples/generated/kotlin/DeleteTest.snippet.remove-item-from-set.kt
   :language: kotlin

In the following example, we have a ``Frog`` object with a set of 
``Snack`` objects. We remove all set elements with the ``set.clear()`` method:
