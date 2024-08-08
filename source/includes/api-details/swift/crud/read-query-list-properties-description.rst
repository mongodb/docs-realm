You can query a :swift-sdk:`List <Classes/List.html>` with the same predicates
as a :swift-sdk:`Results <Structs/Results.html>` collection. Lists implement
the :swift-sdk:`RealmCollection <Protocols/RealmCollection.html>` protocol,
which provides access to common properties and operators such as:

- ``.count``
- ``.first`` and ``.last``
- ``.where`` query syntax
- ``.sorted(by:)`` and ``.distinct(by:)``

Unlike Swift native collections, ``List`` is a reference type. A ``List`` is
only immutable if the database it originates from is opened as read-only.
