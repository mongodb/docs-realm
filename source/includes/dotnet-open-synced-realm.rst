To open a synced {+realm+}, call the 
:dotnet-sdk:`GetInstanceAsync() <reference/Realms.Realm.html#Realms_Realm_GetInstanceAsync_Realms_RealmConfigurationBase_System_Threading_CancellationToken_>` 
method, passing in a 
:dotnet-sdk:`SyncConfiguration <reference/Realms.Sync.SyncConfiguration.html>` 
object that includes the partition name and 
the user. The following code demonstrates this:

.. literalinclude:: /examples/generated/code/start/Examples.codeblock.open-synced-realm.cs
   :language: csharp

In the above example, the code shows how to open the {+realm+} *asynchronously* 
by calling ``GetInstanceAsync()``. You can also open a {+realm+} *synchronously* 
by calling the 
:dotnet-sdk:`GetInstance() <reference/Realms.Realm.html#Realms_Realm_GetInstance_System_String_>` 
method, which is necessary if the device is offline. 

.. literalinclude:: /examples/generated/code/start/Examples.codeblock.open-synced-realm-sync.cs
   :language: csharp

.. note::

   The first time a user logs on to your realm app, you should open the realm 
   *asynchronously* to sync data from the server to the device. After that initial 
   connection, you can open a realm *synchronously* to ensure the app works in 
   an offline state. 
