In C#, to define a Realm object, inherit from the the 
:dotnet-sdk:`IRealmObject <reference/Realms.IRealmObject.html>` interface and
declare the class a ``partial`` class.

The following code block shows an object schema that describes a Dog.
Every Dog object must include a ``Name`` and may
optionally include the dog's ``Age``, ``Breed`` and a list of people that 
represents the dog's ``Owners``. 
