Use :java-sdk:`realm.createObject() <io/realm/Realm.html#createObject(java.lang.Class)>`
in a transaction to create a persistent instance of a database object. You can
then modify the returned object with other field values using accessors and
mutators.

The following example demonstrates how to create an object with 
:java-sdk:`createObject() <io/realm/Realm.html#createObject-java.lang.Class-java.lang.Object->`:
