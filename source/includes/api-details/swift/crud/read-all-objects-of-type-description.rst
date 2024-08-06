To query for objects of a given type in the database, pass the metatype
instance ``YourClassName.self`` to :swift-sdk:`Realm.objects(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V7objectsyAA7ResultsVyxGxmSo0aB6ObjectCRbzlF>`.
This returns a :swift-sdk:`Results <Structs/Results.html>` object
representing all objects of the given type in the database.
