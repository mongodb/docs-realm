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
        activity!!.runOnUiThread {
            // :code-block-start: open-a-realm-local
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.path)
            // :code-block-end:
            // :code-block-start: close-a-realm-local
            realm.close()
            // :code-block-end:
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun configureARealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            // :code-block-start: configure-a-realm-local
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .compactOnLaunch()
                .inMemory()
                .build()
            val realm = Realm.getInstance(config)
            Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.path)
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}