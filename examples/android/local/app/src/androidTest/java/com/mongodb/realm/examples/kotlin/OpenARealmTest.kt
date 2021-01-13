package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test

class OpenARealmTest : RealmTest() {
    @Test
    fun testAllowReadsWritesOnUIThread() {
        val expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: allow-reads-writes-ui-thread
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()

            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v(
                        "EXAMPLE",
                        "Successfully opened a realm with reads and writes allowed on the UI thread."
                    )
                    // :hide-start:
                    expectation.fulfill()
                    // :hide-end:
                }
            })
            // :code-block-end:
        }
        expectation.await()
    }
}