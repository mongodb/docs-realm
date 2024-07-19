You can add, modify, or delete objects asynchronously using
:flutter-sdk:`Realm.writeAsync() <realm/Realm/writeAsync.html>`. 

When you use ``Realm.writeAsync()`` to perform write operations, waiting 
to obtain the write lock and committing a transaction occur in the background. 
Only the write itself occurs on the main process. 
