In Java and Kotlin (Java SDK), the ``RealmResults`` type provides convenience
functions to work with query results. You may want to:

- Check the :java-sdk:`.size() <io/realm/RealmResults.html#size()>` of a
  results set.
- Check whether the results set :java-sdk:`.contains()
  <io/realm/RealmResults.html#contains(java.lang.Object)>`
  an individual element.
- :java-sdk:`get() <io/realm/RealmResults.html#get(int)>` the element at
  an index.
- Get the :java-sdk:`.first() <io/realm/RealmResults.html#first()>` or
  :java-sdk:`.last() <io/realm/RealmResults.html#last()>` element in the
  results set.

For the full range of available functions to work with the results set,
refer to the the :java-sdk:`RealmResults <io/realm/RealmResults.html>` API
reference.

Additionally, you can iterate through the results, or observe a results
set for changes. For more details about observing the results for changes,
refer to :ref:`sdks-react-to-changes`.
