Write transactions are passed to the database's 
:kotlin-sdk:`write() <io.realm.kotlin/-realm/write.html>` or 
:kotlin-sdk:`writeBlocking() <io.realm.kotlin/-realm/write-blocking.html>`
method. Within this callback, you can access a 
:kotlin-sdk:`MutableRealm <io.realm.kotlin/-mutable-realm/index.html>`
instance and then delete objects within the database.

You can only delete live objects, which are only accessible inside of a 
write transaction. You can convert a frozen object to a 
live object in a transaction with :kotlin-sdk:`mutableRealm.findLatest()
<io.realm.kotlin/-mutable-realm/find-latest.html>`.
