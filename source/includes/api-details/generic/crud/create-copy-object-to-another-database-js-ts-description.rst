To copy a managed object to another database instance, call the
:js-sdk:`Realm.create() <classes/Realm-1.html#create>` method in a write
transaction with the object to copy. You can optionally specify the
:js-sdk:`UpdateMode <enums/Realm.UpdateMode.html>` to determine how to handle
copying objects where the target database instance already contains an object
with a matching primary key.
