The following example uses
:ref:`MongoDB Data Access <sdks-access-mongodb>` to insert a
document containing the user ID of the currently logged in user and several 
custom properties into the custom user data collection:

.. literalinclude:: /examples/generated/dotnet/CustomUserDataExamples.snippet.create.cs
   :language: csharp

You may find it helpful to create a C# class (POCO) that represents the custom 
user data object. The SDK will serialize/deserialize this class to and from BSON 
when writing, reading, and updating properties. The example above uses the 
following class to map the properties.
