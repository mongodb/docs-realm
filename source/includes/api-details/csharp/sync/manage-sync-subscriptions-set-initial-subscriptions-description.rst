You can bootstrap the database with an initial subscription set
when you open it with a :dotnet-sdk:`FlexibleSyncConfiguration  
<reference/Realms.Sync.FlexibleSyncConfiguration.html>`. Set the 
:dotnet-sdk:`PopulateInitialSubscriptions 
<reference/Realms.Sync.FlexibleSyncConfiguration.html#Realms_Sync_FlexibleSyncConfiguration_PopulateInitialSubscriptions>` 
parameter to a callback that is invoked when the database instance is created.
Add the queries you want to use to bootstrap the database, as shown in the
following example.
