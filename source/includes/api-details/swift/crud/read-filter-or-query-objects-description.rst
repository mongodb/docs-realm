Swift has its own query APIs that use either the type-safe ``where`` syntax,
or a string ``NSPredicate`` query. For more details about the supported
operators available for Swift queries, refer to :ref:`sdks-filter-data-swift`.

Type-Safe Queries
`````````````````

To use the :ref:`Realm Swift Query API <ios-realm-swift-query-api>`, call
:swift-sdk:`.where <Structs/Query.html>` with a closure that contains a query
expression as an argument.

This query API provides compile-time type-safe query checking. Prefer using
this API over the older string-based ``NSPredicate`` API.

.. literalinclude:: /examples/generated/code/start/ReadRealmObjects.snippet.where.swift
   :language: swift

NSPredicate Queries
```````````````````

To filter with the older string-based ``NSPredicate`` API, call
:swift-sdk:`Results.filter(_:)
<Structs/Results.html#/s:10RealmSwift7ResultsV6filteryACyxGSo11NSPredicateCF>`
with a query predicate.

Prefer using the type-safe query API unless you are using an SDK version
older than 10.19.0. The string-based ``NSPredicate`` query API does not provide
compile-time checking for valid query syntax, and may crash at runtime with
an invalid ``NSPredicate``.
