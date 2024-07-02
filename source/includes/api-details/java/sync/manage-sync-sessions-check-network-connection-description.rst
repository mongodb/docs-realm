To check the current network connection, call :java-sdk:`getConnectionState()
<io/realm/mongodb/sync/SyncSession.html#getConnectionState()>` on your 
:java-sdk:`SyncSession <io/realm/mongodb/sync/SyncSession.html>`.

You can also subscribe to connection changes on your ``SyncSession``
with :java-sdk:`addConnectionChangeListener()
<io/realm/mongodb/sync/SyncSession.html#addConnectionChangeListener(io.realm.mongodb.sync.ConnectionListener)>`
