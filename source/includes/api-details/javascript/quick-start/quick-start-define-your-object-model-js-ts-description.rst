To define an SDK object type, create a schema object that specifies the type's
``name`` and ``properties``. The type name must be unique among object types in
the database.

The following code shows how to define an object model for a ``Task`` object.
In this example:
  
- The ``primaryKey`` is the ``_id`` of type ``int``. Another common type used
  for primary keys is ``ObjectId``.
- The ``name`` field is required.
- The ``status`` and ``owner_id`` fields are optional, denoted by the question 
  mark immediately after the data type.
