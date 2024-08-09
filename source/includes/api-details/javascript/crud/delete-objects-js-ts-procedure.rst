1. Open a write transaction with :js-sdk:`realm.write 
   <classes/Realm-1.html#write>`.

#. Pass the object(s) you want to delete into the write block, or query for
   them inside the block.

#. Call the :js-sdk:`delete <classes/Realm-1.html#delete>`
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

   You can check whether an object is still valid to use by calling
   :js-sdk:`isValid <classes/Realm.Object.html#isValid>`
   on the object. Deleted objects return ``false``.
