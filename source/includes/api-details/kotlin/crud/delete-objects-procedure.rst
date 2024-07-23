1. Open a write transaction with :kotlin-sdk:`realm.write()
   <io.realm.kotlin/-realm/write.html>` or
   :kotlin-sdk:`realm.writeBlocking()
   <io.realm.kotlin/-realm/write-blocking.html>`.

#. Get the live objects by querying the transaction's :kotlin-sdk:`MutableRealm
   <io.realm.kotlin/-mutable-realm/index.html>` 
   for the objects that you want to delete using the
   :kotlin-sdk:`query() <io.realm.kotlin.query/-realm-query/query.html>` method:
   
   #. Specify the object type as a type parameter passed to ``query()``.
   #. (Optional) Filter the set of returned objects by specifying a query. 
      If you don't include a query filter, you return all objects of the 
      specified type. For more information on querying with the SDK, refer to
      :ref:`sdks-crud-read`.

   .. important:: Objects Must Be Live
      
      You can only delete live objects. If your query occurs outside of the 
      write transaction, you must convert the frozen objects 
      to live objects in the transaction with 
      ``mutableRealm.findLatest()``.

#. Pass the set of :kotlin-sdk:`RealmResults
   <io.realm.kotlin.query/-realm-results/index.html>` returned by the query to 
   :kotlin-sdk:`mutableRealm.delete() <io.realm.kotlin/-mutable-realm/delete.html>`.

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
   :kotlin-sdk:`isValid() <io.realm.kotlin.ext/is-valid.html>`.
   Deleted objects return ``false``.
