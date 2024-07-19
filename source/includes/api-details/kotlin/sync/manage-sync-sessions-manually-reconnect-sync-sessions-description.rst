In Kotlin SDK version 1.11.0 and later, you can choose to manually trigger a 
reconnect attempt with the :kotlin-sync-sdk:`App.Sync.reconnect() 
<io.realm.kotlin.mongodb.sync/-sync/reconnect.html>`
instead of waiting for the duration of the incremental backoff. This is 
useful if you have a more accurate understanding of 
the network conditions (for example, when monitoring network changes with the 
``ConnectivityManager`` on Android) and don't want to rely on Realm's automatic 
reconnect detection. The SDK also automatically calls this method when a device 
toggles off airplane mode.
