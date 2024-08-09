The C# LINQ query engine does not provide an API to limit query results.
Instead, rely on the SDK's lazy loading characteristics to implicitly limit
the objects in memory by only accessing the objects you need for an operation.

If you're using the Realm Query Language query engine with C#, you can use
the :ref:`RQL LIMIT() operator <rql-sort-distinct-limit>` to limit query
results.
