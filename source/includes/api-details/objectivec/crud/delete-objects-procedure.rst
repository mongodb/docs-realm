1. Open a write transaction with :objc-sdk:`transactionWithBlock
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)transactionWithBlock:>` or
   :objc-sdk:`asyncTransactionWithBlock
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)asyncTransactionWithBlock:onComplete:>`.

#. Pass the object(s) you want to delete into the write block, or query for
   them inside the block.

   .. important:: Objects Must Be Live
      
      You can only delete live objects. If you are working with a frozen
      object or thread-safe reference, you must ``thaw`` the object or 
      resolve the thread-safe reference before deleting the object. For more
      details, refer to :ref:`sdks-threading`.

#. Call the :objc-sdk:`RLMRealm deleteObject
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)deleteObject:>` method with
   the object to delete.

#. The specified objects are deleted from the database and can no longer be
   accessed or modified. If you try to use a deleted object, the SDK throws an
   error.
   
   If any deleted objects had a relationship with another object, the SDK
   only deletes the reference to the other object. The referenced object
   remains in the database, but it can no longer be queried through the deleted 
   parent property. Refer to the :ref:`sdks-delete-related-objects` section
   for more information.

.. tip:: 

   You can check whether an object is still valid to use by checking the
   :objc-sdk:`invalidated <Classes/RLMObject.html#/c:objc(cs)RLMObject(py)invalidated>`
   property. Deleted objects return ``true``.
