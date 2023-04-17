val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .syncClientResetStrategy(object : RecoverUnsyncedChangesStrategy {
        override fun onBeforeReset(realm: TypedRealm) {
            Log.i("Beginning client reset for " + realm.configuration.path)
        }
        override fun onAfterReset(before: TypedRealm, after: MutableRealm) {
            Log.i("Finished client reset for " + before.configuration.path)
        }
        override fun onManualResetFallback(session: SyncSession, exception: ClientResetRequiredException) {
            Log.i(
                "Couldn't handle the client reset automatically." +
                        " Falling back to manual client reset execution: "
                        + exception.message
            )
            // Clemente: how do you close the realm before executing the reset in kotlin sdk??
            // realm.close()
            try {
                Log.w("About to execute the client reset.")
                // execute the client reset, moving the current realm to a backup file
                exception.executeClientReset()
                Log.w("Executed the client reset.")
            } catch (exception: IllegalStateException) {
                Log.e("Failed to execute the client reset: " + exception.message)
            }
                // ... resetDialog

            // ... open realm
        }
    })
    .build()
// Close the realm before attempting the client reset
realm.close()
