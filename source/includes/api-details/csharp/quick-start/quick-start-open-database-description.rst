Open a database with either the 
:dotnet-sdk:`Realm.GetInstance() <reference/Realms.Realm.html#Realms_Realm_GetInstance_System_String_>` or
:dotnet-sdk:`Realm.GetInstanceAsync() <reference/Realms.Realm.html#Realms_Realm_GetInstanceAsync_Realms_RealmConfigurationBase_System_Threading_CancellationToken_>` 
method. Which method you use depends entirely on if and how you are using `asynchronous 
patterns <https://docs.microsoft.com/en-us/dotnet/csharp/async>`_ in your app. 
The following code shows how to use ``GetInstance()``:
