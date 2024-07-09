#. Open a write transaction with :kotlin-sdk:`realm.write()
   <io.realm.kotlin/-realm/write.html>` or
   :kotlin-sdk:`realm.writeBlocking()
   <io.realm.kotlin/-realm/write-blocking.html>`.

#. Instantiate an unmanaged object instance with the class 
   constructor. You can use an `apply block
   <https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/apply.html>`__
   to configure multiple properties at once.

#. Pass the unmanaged object instance to :kotlin-sdk:`copyToRealm()
   <io.realm.kotlin/-mutable-realm/copy-to-realm.html>`
   to persist the object data to the database. This method returns a
   live managed instance of the object. 

   .. important:: Asymmetric Objects Use Insert()
   
      Asymmetric objects are special write-only objects that do not 
      persist to the database. They *do not* use ``copyToRealm()``. 
      Instead, you pass the asymmetric object instance to the 
      ``insert()`` extension method within a write transaction.
      Refer to the :ref:`sdks-create-asymmetric-object` section 
      on this page for more information.

#. Work with the persisted SDK object through the returned instance. The live
   object is accessible until the write transaction completes. Note that this
   *does not* apply to asymmetric objects, which are write-only. Once an
   asymmetric object is synced, it is deleted from the device database. You
   cannot read, update, or delete an asymmetric object from the device.

.. note:: Frozen Objects
   
   In Kotlin, objects returned from a write closure become frozen objects when
   the write transaction completes. For more information, refer to 
   :ref:`sdks-live-and-frozen-objects`.
