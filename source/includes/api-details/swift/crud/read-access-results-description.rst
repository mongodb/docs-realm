The :swift-sdk:`Results <Structs/Results.html>` type implements the
:swift-sdk:`RealmCollection <Protocols/RealmCollection.html>` protocol, which
provides convenience properties and functions to work with query results. You
may want to:

- Check the :swift-sdk:`.count
  <Protocols/RealmCollection.html#/s:10RealmSwift0A10CollectionP5countSivp>`
  of the number of objects in a results set.
- Check whether the results set ``.isEmpty()``.
- Check whether the results set :swift-sdk:`.contains(where: Predicate)
  <Structs/Query.html#/s:10RealmSwift5QueryVA2A17_HasPersistedTypeRzAA01_C6Binary0eF0RpzlE8contains_7optionsACySbGx_AA13StringOptionsVtF>`
  an object satisfying a predicate.
- Find the ``.firstIndex(of: )`` or ``.lastIndex(of: )`` a given object.
- Get the ``.firstWhere(Predicate)`` to get the first object in the collection
  matching the given predicate.
- Get the :swift-sdk:`.first
  <Protocols/RealmCollection.html#/s:10RealmSwift0A10CollectionP5first7ElementQzSgvp>`
  or :swift-sdk:`.last
  <Protocols/RealmCollection.html#/s:10RealmSwift0A10CollectionP4last7ElementQzSgvp>`
  element in the results set.

Additionally, you can observe a results set for changes. For more details
about observing the results for changes, refer to :ref:`sdks-react-to-changes`.
