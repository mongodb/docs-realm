package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.sync.SyncSession.ClientResetHandler
import org.junit.Test


class ClientResetTest : RealmTest() {
    @Test
    fun clientReset() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: client-reset
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val handler =
                ClientResetHandler { session, error ->
                    Log.e("EXAMPLE", "Client Reset required for: ${session.configuration.serverUrl} for error: $error")
                }
            val app = App(
                AppConfiguration.Builder(appID)
                    .defaultClientResetHandler(handler)
                    .build()
            )
            // :code-block-end:
            expectation.fulfill() // TODO: trigger a client reset and test this code!
        }
        expectation.await()
    }
}