#. Open a write transaction with the
   ``Realm.write()``,``Realm.writeAsync()``, or ``Realm.asyncWrite()`` methods.

#. Instantiate an unmanaged object instance of a class that subclasses one
   of:

   - :swift-sdk:`Object <Typealiases.html#/s:10RealmSwift6Objecta>`
   - :swift-sdk:`EmbeddedObject <Typealiases.html#/s:10RealmSwift14EmbeddedObjecta>`
   - :swift-sdk:`AsymmetricObject <Typealiases.html#/s:10RealmSwift16AsymmetricObjecta>`
   
   For more information, refer to :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the 
   :swift-sdk:`Realm.create() <Structs/Realm.html#/s:10RealmSwift0A0V6create_5value6updatexxm_ypAC12UpdatePolicyOtSo0aB6ObjectCRbzlF>`
   or :swift-sdk:`Realm.add() <Structs/Realm.html#/s:10RealmSwift0A0V3add_6updateySo0aB6ObjectC_AC12UpdatePolicyOtF>`
   methods to persist the object data to the database.

   Note that asymmetric objects are write-only. Once an asymmetric object is
   synced, it is deleted from the device database. You cannot read, update, or
   delete an asymmetric object from the device.
