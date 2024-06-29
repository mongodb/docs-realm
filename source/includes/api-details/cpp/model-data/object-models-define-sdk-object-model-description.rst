In the C++ SDK, you can define your models as regular C++ structs or classes. 
Provide an :ref:`sdks-object-schema` with the object type name and 
the names of any properties that you want to persist to the database. When you 
add the object to the database, the SDK ignores any properties that you omit 
from the schema.

You must declare your object and the schema within the ``realm`` namespace.
You must then use the ``realm`` namespace when you initialize and perform CRUD 
operations with the object.
