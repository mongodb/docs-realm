#. Open a write transaction with a
   :flutter-sdk:`Realm.write() <realm/Realm/write.html>` or 
   :flutter-sdk:`Realm.writeAsync() <realm/Realm/writeAsync.html>` methods.

#. Instantiate an unmanaged object instance whose ``RealmObject`` model 
   has been successfully created, generated, and imported into the file. 
   For more information, refer to :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the 
   :flutter-sdk:`Realm.add() method <realm/Realm/add.html>`
   to persist the object data to the database. You can return managed objects
   from the write transaction block to observe or work with them immediately.

   Note that asymmetric objects are write-only. Once an asymmetric object is
   synced, it is deleted from the device database. You cannot read, update, or
   delete an asymmetric object from the device.
