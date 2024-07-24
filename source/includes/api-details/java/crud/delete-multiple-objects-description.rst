To delete an object from the database, use the ``deleteAllFromRealm()``
method of the :java-sdk:`RealmResults <io/realm/RealmResults.html>`
instance that contains the objects you would like to delete. You can
filter the ``RealmResults`` down to a subset of objects using the
:java-sdk:`where() <io/realm/Realm.html#where-java.lang.Class->` method.

The following example demonstrates how to delete a
collection from the database with :java-sdk:`deleteAllFromRealm()
<io/realm/RealmResults.html#deleteAllFromRealm-->`.
