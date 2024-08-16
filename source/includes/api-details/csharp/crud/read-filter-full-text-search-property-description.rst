In C#, you can query a FTS property using either LINQ or RQL.

To query with LINQ, use :dotnet-sdk:`QueryMethods.FullTextSearch 
<reference/Realms.QueryMethods.html#Realms_QueryMethods_FullTextSearch_System_String_System_String_>`.
The following examples query the ``Person.Biography`` field.

.. literalinclude:: /examples/generated/dotnet/Indexing.snippet.linq-query-fts.cs
   :language: csharp

To query with RQL, use the ``TEXT`` operator. The following example 
queries the ``Person.Biography`` field.
