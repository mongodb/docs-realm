You can compact a realm file by calling :flutter-sdk:`Realm.compact() 
<realm/Realm/compact.html>`. This method takes a :flutter-sdk:`Configuration 
<topics/Configuration-topic.html>` as an argument. When you use this method, 
the device must have enough free space to make a copy of the realm.

``Realm.compact()`` obtains an instance of the realm, and opens it to 
trigger any schema version upgrades, file format upgrades, migration and 
initial data callbacks. Upon successfully opening the realm and performing 
these operations, this method then compacts the realm.

If successful, a call to ``Realm.compact()`` returns ``true``.

Do not call this method from inside a transaction. You also cannot compact an 
open realm.
