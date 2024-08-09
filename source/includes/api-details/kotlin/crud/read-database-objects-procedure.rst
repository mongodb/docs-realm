To find objects stored within a database:

1. Construct queries using the SDK's query builder 
   :kotlin-sdk:`RealmQuery <io.realm.kotlin.query/-realm-query/index.html>`.
   Call the :kotlin-sdk:`query() <io.realm.kotlin.ext/query.html>` method,
   passing the object type as the type parameter. The object type must be
   included in your database schema. 

#. Optionally, pass any query conditions to further refine the results: 
   
   -  Specify a filter to only return objects that meet the condition. If 
      you don't specify a filter, the SDK returns all objects of the specified 
      type. 
      
      Chain filters by appending additional ``query()`` methods to the
      ``RealmQuery``. Each appended ``query()`` acts as an ``AND`` query
      condition. Because of the SDK's lazy evaluation, chaining queries does
      not require separate trips to the database.
   
   -  Specify the sort order for the results. 
      Because the database is unordered, if you don't include a sort order, 
      the SDK cannot guarantee the query returns objects in any specific order.

#. Execute the query using either: 

   -  :kotlin-sdk:`find() <io.realm.kotlin.query/find.html>` for synchronous
      queries. Returns a collection of results.  
   -  :kotlin-sdk:`asFlow() <io.realm.kotlin.query/-realm-element-query/as-flow.html>`
      for asynchronous queries. Subscribes to a ``Flow`` of results changes. 

   .. tip:: Prefer ``asFlow()`` for Large Data Sets 
      
      ``find()`` runs a synchronous query on the thread it is called from. 
      As a result, avoid using ``find()`` for large data sets on the UI thread
      or in logic that could delay the UI thread. 
      
      Prefer ``asFlow()`` to prevent negative performance or UI impact.

#. Work with the results. Objects may be frozen or live, depending on the
   type of query you ran.

Note that any retrieved results don't actually hold matching database objects 
in memory. Instead, the database uses **direct references**, or pointers. 
Database objects in a results collection or flow reference the matched 
objects, which map directly to data in the database file. This also means 
that you can traverse your graph of an object's 
:ref:`relationships <sdks-relationships>` directly through the results 
of a query.
