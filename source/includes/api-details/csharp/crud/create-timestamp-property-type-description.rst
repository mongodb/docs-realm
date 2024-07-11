Use ``DateTimeOffset`` to store timestamp data. The SDK converts
``DateTimeOffset`` values to UTC before storing in the database, and does not
store the timezone information. 

See :github:`Issue #1835 </realm/realm-dotnet/issues/1835>` for more
information.
