The SDK's :java-sdk:`RealmResults <io/realm/RealmResults.html>` collection is
a class representing objects retrieved from queries. A ``RealmResults``
collection represents the lazily-evaluated results of a query operation, and
has these characteristics:

- Results are immutable: you cannot manually add or remove elements to or from
  the results collection.
- Results have an associated query that determines their contents.
- Results are **live** or **frozen** based on the query source. If they derive
  from live objects, the results automatically update when the database
  contents change. If they derive from frozen objects, they represent only a
  snapshot and do not automatically update.
- You cannot manually initialize an empty ``Results`` set. Results can only
  be initialized as the result of a query.

The :java-sdk:`RealmResults <io/realm/RealmResults.html>` class inherits from
:android:`AbstractList <reference/java/util/AbstractList>` and behaves
in similar ways. For example, ``RealmResults`` are ordered, and you can
access the individual objects through an index. If a query has no
matches, the returned ``RealmResults`` object is a list of length
0, not a ``null`` object reference.

**Iteration**

Because SDK collections are live, objects may move as you iterate over a
collection. You can use snapshots to iterate over collections safely.

**Adapters**

The SDK offers adapters to help bind data to standard UI widgets. These
classes work with any class that implements the ``OrderedRealmCollection``
interface, which includes the built-in ``RealmResults`` and ``RealmList``
classes.

.. important:: Adapters Require Managed Objects

   The SDK adapters only accept *managed* SDK object instances tied to a
   database instance. To display non-managed objects, use the general-use
   Android ``RecyclerView.Adapter`` for recycler views or ``ArrayAdapter``
   for list views.
