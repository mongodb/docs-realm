#. Create a 
   :dotnet-sdk:`PartitionSyncConfiguration <reference/Realms.Sync.PartitionSyncConfiguration.html>` 
   object that includes the :ref:`partition value <partition-value>` and 
   the :dotnet-sdk:`User <reference/Realms.Sync.User.html>` object.

#. Open a synced database *asynchronously* by calling the 
   :dotnet-sdk:`GetInstanceAsync() <reference/Realms.Realm.html#Realms_Realm_GetInstanceAsync_Realms_RealmConfigurationBase_System_Threading_CancellationToken_>` 
   method, or *synchronously* with the :dotnet-sdk:`GetInstance() <reference/Realms.Realm.html#Realms_Realm_GetInstance_System_String_>` 
   method. Pass in the ``PartitionSyncConfiguration`` object.
   
The following code demonstrates these steps:
