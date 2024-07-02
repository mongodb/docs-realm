#. Open a write transaction with 
   :cpp-sdk:`Realm.write() function <structrealm_1_1db.html>`.

#. Instantiate an unmanaged object instance within the ``realm`` namespace.

#. Move the unmanaged object instance into the database using the 
   :cpp-sdk:`Realm.add() function <structrealm_1_1db.html>`.
   
   When you move an object into a database, this consumes the object as an rvalue.
   You must use the managed object for any data access or observation. If
   you would like to immediately work with the object, return a managed
   version of the object.

#. Work with the persisted SDK object through the returned instance. Note that
   this *does not* apply to asymmetric objects, which are write-only. Once an
   asymmetric object is synced, it is deleted from the database. You cannot
   read, update, or delete an asymmetric object from the device.
