In the Java SDK, unlike normal Java objects, which contain their own data, an
SDK object doesn't contain data. Instead, SDK objects read and write properties 
directly to the database.

The Java SDK uses ``RealmProxy`` classes to ensure that database objects
don't contain any data themselves. Instead, each class's ``RealmProxy``
accesses data directly in the database.

For every model class in your project, the SDK annotation processor generates
a corresponding ``RealmProxy`` class. This class extends your model class and
is returned when you call ``Realm.createObject()``. In your code, this object
works just like your model class.

**Java SDK Object Limitations**

SDK objects:

- cannot contain fields that use the ``final`` or ``volatile`` modifiers
  (except for :ref:`inverse relationship <sdks-relationships>` fields).

- cannot extend any object other than ``RealmObject``.

- must contain an empty constructor (if your class does not include any
  constructor, the automatically generated empty constructor will suffice)

Usage limitations:

- Because SDK objects are live and can change at any time,
  their ``hashCode()`` value can change over time. As a result, you
  should not use ``RealmObject`` instances as a key in any map or set.

**Java SDK Incremental Builds**

The bytecode transformer used by the Java SDK supports incremental
builds, but your application requires a full rebuild when adding or
removing the following from an SDK object field:

- an ``@Ignore`` annotation

- the ``static`` keyword

- the ``transient`` keyword

You can perform a full rebuild with :guilabel:`Build > Clean Project`
and :guilabel:`Build > Rebuild Project` in these cases.
