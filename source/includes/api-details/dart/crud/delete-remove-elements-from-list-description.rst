You can remove one or more elements from a :flutter-sdk:`RealmList
<realm/RealmList-class.html>` within a write transaction:

- To remove one element from the list, pass the element to ``list.remove()``.
- To remove one element at a specified index in the list, pass the index to 
  ``list.removeAt()``.
- To remove multiple contiguous elements from the list, pass the range to
  ``list.removeRange()``.
- To remove the last element from the list, call ``list.removeLast()``.
- To remove specific elements from a list that match a query, call ``list.removeWhere()``.
