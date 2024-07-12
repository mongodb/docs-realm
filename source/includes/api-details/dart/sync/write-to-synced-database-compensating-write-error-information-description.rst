The Flutter SDK exposes a ``compensatingWrites`` field on a 
:flutter-sdk:`CompensatingWriteError <realm/CompensatingWriteError-class.html>`.
You can access this information through the :ref:`Sync error handler 
<sdks-handle-sync-errors>`. 

This field contains an array of :flutter-sdk:`CompensatingWriteInfo 
<realm/CompensatingWriteInfo-class.html>` objects, which provide:

- The ``objectType`` of the object the client attempted to write
- The ``primaryKey`` of the specific object
- The ``reason`` for the compensating write error

This information is the same information you can find in the App Services logs.
It is exposed on the client for convenience and debugging purposes.
