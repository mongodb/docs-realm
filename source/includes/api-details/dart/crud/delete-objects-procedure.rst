1. Open a write transaction with :flutter-sdk:`realm.write
   <realm/Realm/write.html>` or :flutter-sdk:`realm.writeAsync
   <realm/Realm/writeAsync.html>`.

#. Pass the object(s) you want to delete into the write block, or query for
   them inside the block.

   .. important:: Objects Must Be Live
      
      You can only delete live objects. If you are working with a frozen
      object, you must query for the live object before deleting the object.

#. Call the :flutter-sdk:`delete <realm/Realm/delete.html>`
   method with the object you want to delete as an argument.

#. The specified object is deleted from the database and can no longer be
   accessed or modified. If you try to use a deleted object, the SDK throws an
   error.
   
   If any deleted objects had a relationship with another object, the SDK
   only deletes the reference to the other object. The referenced object
   remains in the database, but it can no longer be queried through the deleted 
   parent property. Refer to the :ref:`sdks-delete-related-objects` section
   for more information.

.. tip:: 

   You can check whether an object is still valid to use by checking the
   object's :flutter-sdk:`isValid <realm/RealmObjectBase/isValid.html>`
   property. Deleted objects return ``false``.
