To copy a managed object to another database instance, call the
:swift-sdk:`create(value: update:) <Structs/Realm.html#/s:10RealmSwift0A0V6create_5value6updatexxm_ypAC12UpdatePolicyOtSo0aB6ObjectCRbzlF>`
method in a write transaction.

If the object type does not have a primary key, or no object with a matching
primary key exists, this method creates a new object in the target database
instance. If an object with a matching primary key already exists in the target
database instance, and you set the :swift-sdk:`update policy 
<Structs/Realm/UpdatePolicy.html>` to ``.modified`` or ``.all``, this method
updates the existing object returns a reference to it.
