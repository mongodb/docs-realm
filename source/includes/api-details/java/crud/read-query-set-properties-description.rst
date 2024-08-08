``RealmSet`` implements Java's ``Set`` interface, so it works just like the
built-in ``HashSet`` class, except managed ``RealmSet`` instances persist
their contents to a database instance. ``RealmSet`` instances that contain SDK
objects actually only store references to those objects, so deleting an
SDK object from a database instance also deletes that object from
any ``RealmSet`` instances that contain the object.

Because ``RealmSet`` implements ``RealmCollection``, it has some useful
mathematical methods, such as ``sum``, ``min``, and ``max``. For a complete
list of available ``RealmSet`` methods, see: :java-sdk:`the RealmSet API 
reference <io/realm/RealmSet.html>`.

- Check if the set contains a specific object with
  :java-sdk:`RealmSet.contains() <io/realm/RealmSet.html#contains-Object->`
- Check if the set contains all of multiple objects with
  :java-sdk:`RealmSet.containsAll() <io/realm/RealmSet.html#containsAll-Collection->`

