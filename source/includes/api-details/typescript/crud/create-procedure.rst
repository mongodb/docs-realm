#. Open a write transaction with the
   :js-sdk:`Realm.write() <classes/Realm-1.html#write>` method.

#. Instantiate an unmanaged object instance of a class that extends
   :js-sdk:`Realm.object <classes/Realm.Object.html>`.
   For more information, refer to :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the 
   :js-sdk:`Realm.create() <classes/Realm-1.html#create>` method
   to persist the object data to the database. You can assign the new managed
   object to a variable or return it from the write transaction block to 
   observe or work with it immediately.

   Note that asymmetric objects are write-only. Once an asymmetric object is
   synced, it is deleted from the device database. You cannot read, update, or
   delete an asymmetric object from the device.
