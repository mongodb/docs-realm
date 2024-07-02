To asynchronously wait for all changes to upload to Atlas from your synced 
database, call :js-sdk:`uploadAllLocalChanges() 
<classes/SyncSession.html#uploadAllLocalChanges>`. This method returns 
true when all changes have been uploaded.

To asynchronously wait for all changes on Atlas to download from the 
Device Sync server to your synced database, call 
:js-sdk:`downloadAllServerChanges() <classes/SyncSession.html#downloadAllServerChanges>`.
This method returns true when all changes have been downloaded.

You can specify a request timeout on the :js-sdk:`App configuration 
<types/AppConfiguration.html>`. With a timeout specified, you can set 
``cancelWaitsOnNonFatalErrors`` on your :js-sdk:`BaseSyncConfiguration 
<types/BaseSyncConfiguration.html>`. When ``true`` and the timeout interval 
arrives, any any outstanding work that is awaiting uploads and downloads 
cancels. When this setting is false, awaiting uploads and downloads does 
not cancel because the SDK treats these timeouts as non-fatal errors.
