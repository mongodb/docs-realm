To query for class projections, pass the metatype instance
``YourProjectionName.self`` to :swift-sdk:`Realm.objects(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V7objectsyAA7ResultsVyxGxmSo0aB6ObjectCRbzlF>`.
This returns a :swift-sdk:`Results <Structs/Results.html>` object
representing all of the class projection objects in the database.

.. literalinclude:: /examples/generated/code/start/ClassProjection.snippet.retrieve-data-through-class-projection.swift
   :language: swift
