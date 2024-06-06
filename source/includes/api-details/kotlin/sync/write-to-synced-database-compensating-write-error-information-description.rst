The :kotlin-sync-sdk:`CompensatingWriteInfo 
<io.realm.kotlin.mongodb.exceptions/-compensating-write-exception/-compensating-write-info/index.html>` 
object provides:

- The ``objectType`` of the object the client attempted to write
- The ``primaryKey`` of the specific object
- The ``reason`` for the compensating write error

This information is the same information you can find in the :ref:`App Services
logs <logs-sync>`. The Kotlin SDK exposes this object on the client for
convenience and debugging purposes.

The following shows an example of how you might log information 
about compensating write errors:

.. io-code-block::

   .. input:: /examples/generated/kotlin/SyncedRealmCRUD.snippet.access-compensating-write.kt
      :language:  kotlin

   .. output:: 
      :language:  console

      A write was rejected with a compensating write error
      The write to object type: Item
      With primary key of: RealmAny{type=OBJECT_ID, value=BsonObjectId(649f2c38835cc0346b861b74)}
      Was rejected because: write to "649f2c38835cc0346b861b74" in table "Item" not allowed; object is outside of the current query view

- The ``Item`` in this message is ``Item`` object used in the object model on
  this page.
- The primary key is the ``objectId`` of the specific object the client
  attempted to write. 
- The ``table "Item"`` refers to the Atlas collection where this object would
  sync.
- The reason ``object is outside of the current query view`` in this example is
  because the query subscription was set to require the object's ``complexity``
  property to be less than or equal to ``4``, and the client attempted to
  write an object outside of this boundary.
