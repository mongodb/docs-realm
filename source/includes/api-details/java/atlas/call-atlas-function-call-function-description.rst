To execute a function from the SDK, use the
:java-sdk:`getFunctions() <io/realm/mongodb/App.html#getFunctions(io.realm.mongodb.User)>`
method of the your :java-sdk:`App <io/realm/mongodb/App.html>`
to retrieve a :java-sdk:`Functions manager <io/realm/mongodb/functions/Functions.html>`.

Pass the name and parameters of the function you would like to call to
:java-sdk:`callFunction() <io/realm/mongodb/functions/Functions.html#callFunction(java.lang.String,java.util.List,java.lang.Class)>`
or :java-sdk:`callFunctionAsync() <io/realm/mongodb/functions/Functions.html#callFunctionAsync(java.lang.String,java.util.List,java.lang.Class,io.realm.mongodb.App.Callback)>`:
