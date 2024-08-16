To query for objects of a given type in the database, pass the object type 
``YourClassName`` to the :cpp-sdk:`db::objects\<T\> <structrealm_1_1db.html>`
member function.

This returns a :cpp-sdk:`Results <structrealm_1_1results.html>` object
representing all objects of the given type in the database.
