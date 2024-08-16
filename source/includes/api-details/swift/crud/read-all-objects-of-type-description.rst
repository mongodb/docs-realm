To query for objects of a given type in the database, pass the metatype
instance ``YourClassName.self`` to :swift-sdk:`Realm.objects(_:)
<Structs/Realm.html#/s:10RealmSwift0A0V7objectsyAA7ResultsVyxGxmSo0aB6ObjectCRbzlF>`.
This returns a :swift-sdk:`Results <Structs/Results.html>` object
representing all objects of the given type in the database.

Read an Object Asynchronously
`````````````````````````````

When you use an actor-isolated database instance, you can use Swift
concurrency features to asynchronously query objects.

.. literalinclude:: /examples/generated/code/start/RealmActor.snippet.read-objects.swift
   :language: swift

If you need to manually advance the state of an observed database on the main 
thread or an actor-isolated realm, call ``await realm.asyncRefresh()``. 
This updates the database and outstanding objects managed by the database to
point to the most recent data and deliver any applicable notifications.

For more information about working with the SDK using Swift concurrency
features, refer to :ref:`swift-actor-isolated-realm`.
