The :cpp-sdk:`compensating_writes_info()
<structrealm_1_1internal_1_1bridge_1_1sync__error.html>` 
function provides an array of ``compensating_write_error_info`` 
structs that contain:

- The ``object_name`` of the object the client attempted to write
- The ``primary_key`` of the specific object
- The ``reason`` for the compensating write error

This information is the same information you can find in the
:ref:`App Services logs <logs-sync>`. The C++ SDK exposes this object on the
client for convenience and debugging purposes.

The following shows an example of how you might log information 
about compensating write errors:

.. io-code-block::

   .. input:: /examples/generated/cpp/sync-errors.snippet.get-compensating-write-error-info.cpp
      :language:  cpp

   .. output:: 
      :language:  console

      A write was rejected with a compensating write error.
      An object of type Item
      was rejected because write to ObjectID("6557ddb0bf050934870ca0f5") in 
      table "Item" not allowed; object is outside of the current query view.

- The ``Item`` in this message is ``Item`` object used in the object model.
- The ``table "Item"`` refers to the Atlas collection where this object would
  sync.
- The reason ``object is outside of the current query view`` in this message
  is because the query subscription was set to require the object's ``complexity``
  property to be less than or equal to ``4``. The client attempted to write an 
  object outside of this boundary.
- The primary key is the ``objectId`` of the specific object the client
  attempted to write.
