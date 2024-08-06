1. Open a write transaction with one of the relevant APIs:

   - :swift-sdk:`write() <Structs/Realm.html#/s:10RealmSwift0A0V5write16withoutNotifying_xSaySo20RLMNotificationTokenCG_xyKXEtKlF>`
   - :swift-sdk:`writeAsync() <Structs/Realm.html#/s:10RealmSwift0A0V10writeAsync_10onCompletes6UInt32Vyyc_ys5Error_pSgcSgtF>`
   - :swift-sdk:`asyncWrite() <Structs/Realm.html#/s:10RealmSwift0A0V10asyncWriteyxxyKXEYaKlF>` and friends

#. Pass the object(s) you want to delete into the write block, or query for
   them inside the block.

   .. important:: Objects Must Be Live
      
      You can only delete live objects. If you are working with a frozen
      object or thread-safe reference, you must ``thaw()`` the object or 
      resolve the thread-safe reference before deleting the object. For more
      details, refer to :ref:`sdks-threading`.

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
   :swift-sdk:`isInvalidated()
   <Extensions/Object.html#/c:@CM@RealmSwift@@objc(cs)RealmSwiftObject(py)invalidated>`.
   Deleted objects return ``true``.
