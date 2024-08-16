You can query geospatial data in two ways:

- Using the :swift-sdk:`.geoWithin()
  <Structs/Query.html#/s:10RealmSwift5QueryVA2A16OptionalProtocolRzSo0aB14EmbeddedObjectC7WrappedRczlE9geoWithinyACySbGqd__So13RLMGeospatialRd__lF>`
  operator with the type-safe :ref:`Swift Query API <sdks-swift-query-api>`
- Using a :swift-sdk:`.filter()
  <Structs/ObservedResults.html#/s:10RealmSwift15ObservedResultsV6filterSo11NSPredicateCSgvp>`
  with an :ref:`NSPredicate query <sdks-nspredicate-query>` that uses
  ``geoWithin``.

The examples below show the results of queries using these two ``Company``
objects.
