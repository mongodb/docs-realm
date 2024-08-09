To query, filter, and sort data in the database, use the SDK query engine. 
There are two ways to use the query engine with C#:

- :ref:`LINQ Syntax <sdks-dotnet-linq>`
- :ref:`Realm Query Language (RQL) <realm-query-language>`

Use LINQ syntax for querying when possible, as it provides compile-time checks
for queries and aligns with .NET conventions.

Filter Data with LINQ
`````````````````````

To filter data with LINQ syntax, call the :dotnet-sdk:`Where()
<linqsupport.html#restriction-operators>` operator with a
:dotnet-sdk:`Predicate <linqsupport.html#predicate-operations>` that describes
the subset of data you want to access.

.. literalinclude:: /examples/generated/dotnet/QueryEngineExamples.snippet.logical.cs
   :language: csharp

Filter Data with RQL
````````````````````

You can also use the :ref:`Realm Query Language <realm-query-language>` (RQL) 
to query realms. RQL is a string-based query language used to access the query 
engine. When using RQL, you use the 
:dotnet-sdk:`Filter() <reference/Realms.CollectionExtensions.html?q=Filter>`
method.

.. important::

   Because :ref:`LINQ <sdks-dotnet-linq>` provides compile-time error checking 
   of queries, you should use it instead of RQL in most cases. If you require 
   features beyond LINQ's current capabilities, such as using 
   :ref:`aggregation <rql-aggregate-operators>`, use RQL.
