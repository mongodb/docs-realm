You can check the network connection state through the 
:kotlin-sync-sdk:`SyncSession.ConnectionState 
<io.realm.kotlin.mongodb.sync/-connection-state/index.html>`. This is a
property of type ConnectionState enum, whose possible values are:

- DISCONNECTED
- CONNECTING
- CONNECTED

.. literalinclude:: /examples/generated/kotlin/ManageSyncSession.snippet.get-network-connection.kt
   :language: kotlin

Monitor the state of the network connection with 
:kotlin-sync-sdk:`connectionStateAsFlow 
<io.realm.kotlin.mongodb.sync/-sync-session/connection-state-as-flow.html>`.
This property returns a Flow of :kotlin-sync-sdk:`ConnectionStateChange
<io.realm.kotlin.mongodb.sync/-connection-state-change/index.html>`
objects that updates when the network connection changes. You can access the 
new and old ``ConnectionState`` from ``ConnectionStateChange``.
