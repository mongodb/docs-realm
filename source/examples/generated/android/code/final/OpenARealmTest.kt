package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.PARTITION
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.sync.SyncConfiguration
import org.junit.Test

class OpenARealmTest : RealmTest() {
    @Test
    fun testAllowReadsWritesOnUIThread() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()

                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            expectation.fulfill()
                        }
                    })
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
            //expectation.await()//TODO: FIGURE OUT WHY THIS IS BROKEN
        }
    }
}