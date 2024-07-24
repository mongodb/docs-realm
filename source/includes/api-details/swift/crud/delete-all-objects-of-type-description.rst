To delete all objects of a given object type from the database, pass
the result of :swift-sdk:`Realm.objects(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V7objectsyAA7ResultsVyxGxmSo0aB6ObjectCRbzlF>`
for the type you wish to delete to :swift-sdk:`Realm.delete(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V6deleteyyxSTRzSo13RLMObjectBaseC7ElementRczlF>`
inside of a write transaction.
