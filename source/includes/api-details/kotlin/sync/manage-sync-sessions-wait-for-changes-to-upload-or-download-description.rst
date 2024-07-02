To asynchronously wait for all changes to upload to Atlas from your synced
database, call :kotlin-sync-sdk:`uploadAllLocalChanges
<io.realm.kotlin.mongodb.sync/-sync-session/upload-all-local-changes.html>`.
This method returns ``true`` when all changes have been uploaded.

To asynchronously wait for all changes on Atlas to download from the Device Sync 
server to your synced database, call :kotlin-sync-sdk:`downloadAllServerChanges
<io.realm.kotlin.mongodb.sync/-sync-session/download-all-server-changes.html>`.
This method returns ``true`` when all changes have been downloaded.

You can also include an optional ``timeout`` parameter to either method to 
determine the maximum amount of time before returning ``false``. Note that 
the upload or download continues in the background even after returning ``false``.
