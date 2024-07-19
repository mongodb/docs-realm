To upsert an object, call :swift-sdk:`Realm.add(_:update:)
<Structs/Realm.html#/s:10RealmSwift0A0V3add_6updateySo0aB6ObjectC_AC12UpdatePolicyOtF>`
with the second parameter, update policy, set to ``.modified``.

.. literalinclude:: /examples/generated/code/start/UpdateRealmObjects.snippet.upsert.swift
   :language: swift

You can also partially update an object by passing the primary key and a
subset of the values to update:
