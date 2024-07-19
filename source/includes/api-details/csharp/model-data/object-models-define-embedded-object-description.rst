In C#, to define an embedded object, inherit from the the 
:dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>` interface
and declare the class a ``partial`` class. You can reference an embedded object
type from parent object types in the same way as you would define a relationship.

Consider the following example where the ``Address`` is an Embedded Object. Both
the ``Contact`` and the ``Business`` classes reference the ``Address`` as an
embedded object.
