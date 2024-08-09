An application could use the following object schemas to indicate
that a Person may own multiple Dogs by including them in its ``dog``
property:

.. literalinclude:: /examples/generated/dotnet/Relationships.snippet.one-to-many.cs
    :language: csharp

To see the to-many relationship of Person to Dog, you query for the 
Person and get that person's Dogs.
