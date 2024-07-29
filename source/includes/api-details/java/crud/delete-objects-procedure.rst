1. Open a write transaction with one of the relevant APIs.

#. Pass the object(s) you want to delete into the write block, or query for
   them inside the block.

   .. important:: Objects Must Be Live
      
      You can only delete live objects. If you are working with a frozen
      object, you query for the live version of the object on the local thread
      before deleting the object. For more details, refer to
      :ref:`sdks-threading`.

#. Call the ``delete()`` method with the object you want to delete as an
   argument.

#. The specified objects are deleted from the database and can no longer be
   accessed or modified. If you try to use a deleted object, the SDK throws an
   error.
   
   If any deleted objects had a relationship with another object, the SDK
   only deletes the reference to the other object. The referenced object
   remains in the database, but it can no longer be queried through the deleted 
   parent property. Refer to the :ref:`sdks-delete-related-objects` section
   for more information.

.. tip:: 

   You can check whether an object is still valid to use by calling 
   :java-sdk:`isValid() <io/realm/RealmObject.html#isValid()>`.
   Deleted objects return ``false``.
