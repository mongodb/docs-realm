The Swift SDK exposes a :swift-sdk:`compensatingWriteInfo 
<Typealiases.html#/s:10RealmSwift21CompensatingWriteInfoa>` field on a 
SyncError whose code is ``.writeRejected``. You can access this information
through the :ref:`Sync error handler <sdks-handle-sync-errors>`. 

This field contains an array of :objc-sdk:`RLMCompensatingWriteInfo 
<Classes/RLMCompensatingWriteInfo.html>` objects, which provide:

- The ``objectType`` of the object the client attempted to write
- The ``primaryKey`` of the specific object
- The ``reason`` for the compensating write error

This information is the same information you can find in the App Services logs.
It is exposed on the client for convenience and debugging purposes.

.. example::

   This error handler shows an example of how you might log information 
   about compensating write errors:

   .. literalinclude:: /examples/generated/code/start/Errors.snippet.access-compensating-write.swift
      :language: swift

   The example error handler above produces this output when a compensating
   write error occurs:

   .. code-block:: console

      A write was rejected with a compensating write error
      The write to object type: Optional("Item") 
      With primary key of: objectId(641382026852d9220b2e2bbf) 
      Was rejected because: Optional("write to \"641382026852d9220b2e2bbf\" in table \"Item\" not 
      allowed; object is outside of the current query view")

   - The ``Optional("Item")`` in this message is an ``Item`` object used in the 
     :github:`Swift Template App <mongodb/template-app-swiftui-todo>`.
   - The primary key is the ``objectId`` of the specific object the client 
     attempted to write. 
   - The ``table \"Item"\`` refers to the Atlas collection where this object
     would sync.
   - The reason ``object is outside of the current query view`` in this example
     is because the query subscription was set to require the object's ``isComplete``
     property to be ``true``, and the client attempted to write an object where
     this property was ``false``.
