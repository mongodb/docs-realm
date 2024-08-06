You can remove one or more elements from a :swift-sdk:`List <Classes/List.html>`
within a write transaction:

- To remove one element at a specified index in the list, pass the index to 
  :swift-sdk:`list.removeAt() <Classes/List.html#/s:10RealmSwift4ListC6remove2atySi_tF>`.
- To remove multiple contiguous elements from the list, pass the range to
  :swift-sdk:`list.removeSubrange() <Classes/List.html#/s:10RealmSwift4ListC14removeSubrangeyyqd__SXRd__Si5BoundRtd__lF>`.
- To remove the first N elements from the beginning or end of a list, call the
  :swift-sdk:`list.removeFirst()
  <Classes/List.html#/s:10RealmSwift4ListC11removeFirstyySiF>` or
  :swift-sdk:`list.removeLast()
  <Classes/List.html#/s:10RealmSwift4ListC10removeLastyySiF>` methods with an
  Int number of items to remove from the beginning or end of the list.

You can also remove *all* list elements at once by calling
:swift-sdk:`list.removeAll() <Classes/List.html#/s:10RealmSwift4ListC9removeAllyyF>`.
