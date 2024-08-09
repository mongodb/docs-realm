To filter by property, you can pass Realm Query Language (RQL) filters and 
operators, use Kotlin's built-in extension methods or the SDK's convenience 
methods, or use a combination.

In the following example, we :kotlin-sdk:`query()
<io.realm.kotlin/-mutable-realm/query.html>` a ``Frog`` object type and
filter by the ``name`` property. We call the ``find()`` method to execute
the query.
