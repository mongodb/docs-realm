#. Open a write transaction with the
   :java-sdk:`realm.executeTransaction() <io/https://www.mongodb.com/docs/realm-sdks/java/latest/io/realm/Realm.html#executeTransaction(io.realm.Realm.Transaction)>` or 
   :java-sdk:`realm.executeTransactionAsync() <io/realm/Realm.html#executeTransactionAsync(io.realm.Realm.Transaction,io.realm.Realm.Transaction.OnSuccess,io.realm.Realm.Transaction.OnError)>` methods.

#. Instantiate an unmanaged object instance whose model subclasses 
   :java-sdk:`RealmObject <io/realm/RealmObject.html>` or implements the
   :java-sdk:`RealmModel <io/realm/RealmModel.html>` interface. For more
   information, refer to :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the 
   :java-sdk:`realm.createObject() method <io/realm/Realm.html#createObject(java.lang.Class)>`
   or the 
   :java-sdk:`createObjectFromJson() method <io/realm/Realm.html#createObjectFromJson-java.lang.Class-java.lang.String->`
   to create an SDK object instance.
