To find objects stored within a database:

1. Query for objects of a given type in the database. Pass the object type 
   to the :js-sdk:`Realm.objects() <classes/Realm-1.html#objects>` method.

#. Optionally, pass any query conditions to further refine the results: 
   
   -  Specify a filter to only return objects that meet the condition. If 
      you don't specify a filter, the SDK returns all objects of the specified 
      type.
   
   -  Specify the sort order for the results. 
      Because the database is unordered, if you don't include a sort order, 
      the SDK cannot guarantee the query returns objects in any specific order.

#. Work with the results. Objects may be frozen or live, depending on whether
   you queried a frozen or live database, collection, or object.

Note that any retrieved results don't actually hold matching database objects 
in memory. Instead, the database uses **direct references**, or pointers. 
Database objects in a results collection reference the matched objects, which
map directly to data in the database file. This also means that you can
traverse your graph of an object's :ref:`relationships <sdks-relationships>`
directly through the results of a query.
