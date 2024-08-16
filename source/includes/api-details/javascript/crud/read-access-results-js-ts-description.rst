The ``Realm.Results`` type provides convenience functions to work with query
results. You may want to:

- Check the :js-sdk:`.length <classes/Realm.Results.html#length-1>` of a
  results set.
- Check whether the results set :js-sdk:`.isEmpty()
  <classes/Realm.Results.html#isEmpty>`.
- Check whether the results set :js-sdk:`.includes()
  <classes/Realm.Results.html#includes-1>` an individual element.
- Find the :js-sdk:`indexOf() <classes/Realm.Results.html#indexOf-1>`
  an element.
- :js-sdk:`find() <classes/Realm.Results.html#find-1>`
  an element matching a predicate.

For the full range of available functions to work with the results set,
refer to the the :js-sdk:`Realm.Results <classes/Realm.Results.html>` API
reference.

Additionally, you can iterate through the results, or observe a results
set for changes. For more details about observing the results for changes,
refer to :ref:`sdks-react-to-changes`.
