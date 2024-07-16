To call an Atlas Function, use the 
:dotnet-sdk:`Functions.CallAsync() <reference/Realms.Sync.User.FunctionsClient.html#Realms_Sync_User_FunctionsClient_CallAsync_System_String_System_Object___>` 
method on the ``User`` object, passing in the name of the function as the first 
parameter and the arguments as the remaining parameters:

.. literalinclude:: /examples/generated/dotnet/FunctionExamples.snippet.callfunc.cs
   :language: csharp

.. note::

   The ``CallAsync()`` method returns a single ``BsonValue`` object, which you can 
   deserialize after calling the function or by using the generic 
   overload. Both of these approaches to deserialization are shown in the 
   code above. 
   
A ``BsonValue`` object can hold a single primitive value (as shown in the 
example above), or hold a complete BSON document. If 
you have a class that maps to the returned object, you can deserialize 
to that class by using the generic overload. For example, the following code 
calls a function that returns an object from a collection of "RealmTasks". 
Since we know the shape of the returned object, we we can deserialize the 
``BsonValue`` to a class that we have created, and then we have 
access to the properties and methods on that object:
