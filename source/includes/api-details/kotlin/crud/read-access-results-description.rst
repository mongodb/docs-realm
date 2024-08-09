In Kotlin, the ``RealmResults`` type provides convenience functions to work
with query results. You may want to:

- Check the :kotlin-sdk:`.size
  <io.realm.kotlin.query/-realm-results/index.html#844915858%2FProperties%2F878332154>`
  of a results set.
- Check whether the results set :kotlin-sdk:`.isEmpty()
  <io.realm.kotlin.query/-realm-results/index.html#-1000881820%2FFunctions%2F878332154>`.
- Check whether the results set :kotlin-sdk:`.contains()
  <io.realm.kotlin.query/-realm-results/index.html#-943530520%2FFunctions%2F878332154>`
  an individual element or :kotlin-sdk:`.containsAll()
  <io.realm.kotlin.query/-realm-results/index.html#-1678668425%2FFunctions%2F878332154>`
  the elements in a collection.
- Find the :kotlin-sdk:`indexOf()
  <io.realm.kotlin.query/-realm-results/index.html#1971462718%2FFunctions%2F878332154>`
  an element.
- :kotlin-sdk:`get()
  <io.realm.kotlin.query/-realm-results/index.html#961975567%2FFunctions%2F878332154>`
  the element at an index.
- Get the ``.first()`` element in the results set.

For the full range of available functions to work with the results set,
refer to the the :kotlin-sdk:`RealmResults
<io.realm.kotlin.query/-realm-results/index.html>` API reference.

Additionally, you can iterate through the results, or observe a results
set for changes. For more details about observing the results for changes,
refer to :ref:`sdks-react-to-changes`.

Iterate Results using Flow
++++++++++++++++++++++++++

You can iterate through results using a 
`Kotlin Coroutine Flow <https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/>`__. 

To convert query results into an asynchronous ``Flow``, call 
:kotlin-sdk:`asFlow() <io.realm.kotlin.query/-realm-element-query/as-flow.html>`
on the query. The SDK returns a :kotlin-sdk:`ResultsChange <io.realm.kotlin.notifications/-results-change/index.html>` 
``Flow`` that you can iterate through with 
`flow.collect() <https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/collect.html>`__.

In the following example, we iterate through a ``Flow`` of ``Frog`` objects.
