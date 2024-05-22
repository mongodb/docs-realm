The following example demonstrates how to upsert an object with the
SDK. We create a new turtle enthusiast named "Drew" and then
update their name to "Andy" using :java-sdk:`insertOrUpdate()
<io/realm/Realm.html#insertOrUpdate-io.realm.RealmModel->`:

.. literalinclude:: /examples/generated/java/sync/WritesTest.snippet.upsert-an-object.java
   :language: java
   :emphasize-lines: 14-16
   :copyable: false

You can also use :java-sdk:`copyToRealmOrUpdate()
<io/realm/Realm.html#copyToRealmOrUpdate-E-io.realm.ImportFlag...->` to
either create a new object based on a supplied object or update an
existing object with the same primary key value. Use the
``CHECK_SAME_VALUES_BEFORE_SET``
:java-sdk:`ImportFlag <io/realm/ImportFlag.html>` to only update fields
that are different in the supplied object:

The following example demonstrates how to insert an object or, if an object already
exists with the same primary key, update only those fields that differ:
