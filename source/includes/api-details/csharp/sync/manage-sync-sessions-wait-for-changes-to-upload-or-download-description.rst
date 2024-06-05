To asynchronously wait for your changes to finish uploading, get the Sync
session from the :dotnet-sdk:`Realms.Sync.SyncSession
<reference/Realms.Realm.html#Realms_Realm_SyncSession>`
property, and then call the :dotnet-sdk:`session.WaitForUploadAsync()
<reference/Realms.Sync.Session.html#Realms_Sync_Session_WaitForUploadAsync>`
method.

To wait for changes to finish downloading, call the
:dotnet-sdk:`session.WaitForDownloadAsync()
<reference/Realms.Sync.Session.html#Realms_Sync_Session_WaitForDownloadAsync>` 
method.
