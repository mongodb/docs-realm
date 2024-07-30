To delete all objects of a given object type from the database, query for
objects of the type you want to delete, and pass the result to
:swift-sdk:`Realm.delete(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V6deleteyyxSTRzSo13RLMObjectBaseC7ElementRczlF>`
inside of a write transaction.
