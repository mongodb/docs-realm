The .NET SDK exposes a ``CompensatingWrites`` field on a 
:dotnet-sdk:`CompensatingWriteException <reference/Realms.Sync.Exceptions.CompensatingWriteException.html>`.
You can access this information through the :ref:`Sync error handler 
<sdks-handle-sync-errors>`. 

When a ``CompensatingWriteException`` is thrown, it includes an enumerable of 
:dotnet-sdk:`CompensatingWriteInfo <reference/Realms.Sync.Exceptions.CompensatingWriteInfo.html>` 
objects. Each ``CompensatingWriteInfo`` object contains properties that describe 
the object type, its primary key, and reason the server performed the compensating 
write.

This information is the same information you can find in the App Services logs.
It is exposed on the client for convenience and debugging purposes.
