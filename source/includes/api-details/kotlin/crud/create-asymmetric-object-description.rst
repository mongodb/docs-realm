Unlike other SDK objects, you *do not* use the ``copyToRealm()`` method to
create it. Instead, you use a special ``insert()`` extension method to insert 
it into the database.

To create a new ``AsymmetricRealmObject`` instance, instantiate a 
new object of an
:ref:`asymmetric object type <sdks-asymmetric-objects>` using 
:kotlin-sync-sdk:`insert() <io.realm.kotlin.mongodb.ext/insert.html>`.

In the following example, we instantiate a new ``WeatherSensor``
object and pass it to ``insert()`` within a write transaction:

.. versionadded:: 1.10.0
