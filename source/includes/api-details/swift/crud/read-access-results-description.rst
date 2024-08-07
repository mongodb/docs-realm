The ``Results`` type - and the collections types that it derives from -
provides convenience properties and functions to work with query results. You
may want to:

- Check the ``.count`` of the number of objects in a results set.
- Check whether the results set ``.isEmpty()``.
- Check whether the results set ``.contains(where: Predicate)`` an object
  satisfying a predicate.
- Find the ``.firstIndex(of: )`` or ``.lastIndex(of: )`` a given object.
- Get the ``.firstWhere(Predicate)`` to get the first object in the collection
  matching the given predicate.
- Get the ``.first`` or ``.last`` element in the results set.

Additionally, you can observe a results set for changes. For more details
about observing the results for changes, refer to :ref:`sdks-react-to-changes`.
