The SDK's :kotlin-sdk:`RealmResults
<io.realm.kotlin.query/-realm-results/index.html>` collection is a class
representing objects retrieved from queries. A ``RealmResults`` collection
represents the lazily-evaluated results of a query operation, and has these
characteristics:

- Results are immutable: you cannot manually add or remove elements to or from
  the results collection.
- Results have an associated query that determines their contents.
- Results are **live** or **frozen** based on the query source. If they derive
  from a query on a :kotlin-sdk:`MutableRealm
  <io.realm.kotlin/-mutable-realm/index.html>`, the results automatically
  update when the database contents on the thread change. If they derive from
  a query on a :kotlin-sdk:`Realm <io.realm.kotlin/-realm/index.html>`, they
  represent only a snapshot and do not automatically update.
- You cannot manually initialize an empty ``RealmResults`` set. Results can only
  be initialized as the result of a query.
