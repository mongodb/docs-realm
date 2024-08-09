The SDK's :flutter-sdk:`RealmResults <realm/RealmResults-class.html>`
collection is a class representing objects retrieved from queries. A
``RealmResults`` collection represents the lazily-evaluated results of a query
operation, and has these characteristics:

- Results are immutable: you cannot manually add or remove elements to or from
  the results collection.
- Results have an associated query that determines their contents.
- Results are **live** or **frozen** based on the query source. If they derive
  from live objects, the results automatically update when the database
  contents change in the isolate context. If they derive from frozen objects,
  they represent only a snapshot and do not automatically update.
- You cannot manually initialize an empty ``RealmResults`` set. Results can
  only be initialized as the result of a query.
