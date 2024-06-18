To close a database and release all underlying resources, call 
:kotlin-sdk:`realm.close() <io.realm.kotlin/-realm/close.html>`. The
``close()`` method blocks until all write transactions on the database
have completed.
