You can remove one or more elements in a single transaction from a 
:kotlin-sdk:`RealmList <io.realm.kotlin.types/-realm-list/index.html>`:

- To remove one element from the list, pass the element to 
  :kotlin-sdk:`list.remove() <io.realm.kotlin.types/-realm-list/index.html#731697687%2FFunctions%2F878332154>`.
- To remove one element at a specified index in the list, pass the index to 
  :kotlin-sdk:`list.removeAt() <io.realm.kotlin.types/-realm-list/index.html#-1899070414%2FFunctions%2F878332154>`.
- To remove multiple elements from the list, pass the elements to
  :kotlin-sdk:`list.removeAll() <io.realm.kotlin.types/-realm-list/index.html#1522148962%2FFunctions%2F878332154>`.

You can also remove *all* list elements at once by calling
:kotlin-sdk:`list.clear() <io.realm.kotlin.types/-realm-list/index.html#-35526398%2FFunctions%2F878332154>`.

In the following example, we have a ``Forest`` object with a list of
``Pond`` objects. We remove the list elements in a series of operations until the 
list is empty:

.. literalinclude:: /examples/generated/kotlin/DeleteTest.snippet.remove-items-from-list.kt
   :language: kotlin

In the following example, we have a ``Forest`` object with a list of 
``Pond`` objects. We remove all list elements with the ``list.clear()`` method:
