The Node.js SDK exposes a ``writes`` field on a 
:js-sdk:`CompensatingWriteError <classes/Realm.CompensatingWriteError.html>`.
You can access this information through the :ref:`Sync error handler 
<sdks-handle-sync-errors>`. 

This field contains an array of :js-sdk:`CompensatingWriteInfo 
<types/Realm.CompensatingWriteInfo.html>` objects, which provide:

- The ``objectName`` of the object the client attempted to write
- The ``primaryKey`` of the specific object
- The ``reason`` for the compensating write error

This information is the same information you can find in the App Services logs.
It is exposed on the client for convenience and debugging purposes.
