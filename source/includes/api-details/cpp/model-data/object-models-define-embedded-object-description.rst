In C++, you define an embedded object by providing a ``REALM_EMBEDDED_SCHEMA``
whose first argument is the struct or class name. Add the names of any
properties that you want the database to persist.

Define a property as an embedded object on the parent object by setting 
a pointer to the embedded object's type.
