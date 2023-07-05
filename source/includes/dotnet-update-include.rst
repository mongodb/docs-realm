Upserting a document is the same as creating a new one, except you set the 
optional ``update`` parameter to ``true``. In this example, we create a new 
``Item`` object with a unique ``Id``. We then try to insert an item with the 
same id. Because we have set the ``update`` parameter to ``true``, the existing 
record is updated.

.. literalinclude:: /examples/generated/dotnet/QuickStartExamples.snippet.upsert.cs
   :language: csharp
