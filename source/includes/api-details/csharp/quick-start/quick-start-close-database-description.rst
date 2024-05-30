The database instance implements ``IDisposable`` to ensure native resources are 
freed up. You should dispose of a database object immediately after use,
especially on background threads. The simplest way to do this is by declaring
the database object with a ``using`` statement, or wrapping the code that
interacts with a database in a ``using (...)`` statement:

.. literalinclude:: /examples/generated/dotnet/OpenARealmExamples.snippet.scope.cs
   :language: csharp

If you require a database object to be shared outside of a single method, 
to manage its state by calling the
:dotnet-sdk:`Dispose() <reference/Realms.Realm.html#Realms_Realm_Dispose>` method:
