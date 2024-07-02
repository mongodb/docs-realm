To upsert an object into a database, insert an object with a primary key 
using 
:kotlin-sdk:`copyToRealm() <io.realm.kotlin/-mutable-realm/copy-to-realm.html>`, 
as you would when creating a new object. Pass an 
:kotlin-sdk:`UpdatePolicy <io.realm.kotlin/-update-policy/index.html>` 
parameter to specify how the SDK should handle existing objects with the same
primary key: 

- ``UpdatePolicy.ALL``: Update all properties on any existing objects 
  identified with the same primary key. 
- ``UpdatePolicy.ERROR`` (default): Disallow updating existing objects and instead 
  throw an exception if an object already exists with the same primary key. If 
  you do not specify an update policy, the SDK uses this policy by default.

The following can occur depending on the update policy:

- If no object exists that matches the primary key, the SDK creates the new object.
- If an object with the same primary key already exists, the SDK either: 

  - Updates all properties on any existing objects identified with the 
    same primary key. Note that properties are marked as updated in change 
    listeners, even if the property was updated to the same value.
  - Throws an exception indicating that an object already exists in the database.

In the following example, we attempt to insert a ``Frog`` object with a
primary key that already exists in the database with ``UpdatePolicy.ALL``.
Then, we confirm the object is successfully upserted:
