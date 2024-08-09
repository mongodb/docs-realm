You can remove one or more elements from a :flutter-sdk:`RealmSet
<realm/RealmSet-class.html>` within a write transaction:

- To remove one element from the set, pass the element to ``set.remove()``.
- To remove specific elements from a set that match a query, call ``set.removeWhere()``.
- To remove all elements from the set, call ``set.removeAll()``.
