You can wait for changes to upload with :java-sdk:`SyncSession.uploadAllLocalChanges() 
<io/realm/mongodb/sync/SyncSession.html#uploadAllLocalChanges()>` or
:java-sdk:`SyncSession.uploadAllLocalChanges(long timeout, TimeUnit unit) 
<io/realm/mongodb/sync/SyncSession.html#uploadAllLocalChanges(long,java.util.concurrent.TimeUnit)>`.
These methods block block execution until all known changes on the device have
been uploaded to the server (or the specified timeout is hit).

You can wait for changes to download with :java-sdk:`SyncSession.downloadAllServerChanges() 
<io/realm/mongodb/sync/SyncSession.html#downloadAllServerChanges()>` or
:java-sdk:`SyncSession.downloadAllServerChanges(long timeout, TimeUnit unit) 
<io/realm/mongodb/sync/SyncSession.html#downloadAllServerChanges(long,java.util.concurrent.TimeUnit)>`.
These methods block block execution until all known changes on the server have
downloaded to the device (or the specified timeout is hit).
