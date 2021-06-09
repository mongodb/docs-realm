package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test
import io.realm.exceptions.RealmFileException;

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
            
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
            } catch(ex: RealmFileException) {
                Log.v("EXAMPLE", "Error opening the realm.")
                Log.v("EXAMPLE", ex.toString())
            }
            // :code-block-end:
            realm = Realm.getInstance(config)
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
                .name("alternate-realm")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .compactOnLaunch()
                .inMemory()
                .build()
            val realm = Realm.getInstance(config)
            Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun setAndUseDefaultRealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            // :code-block-start: set-default-realm
            val config = RealmConfiguration.Builder()
                .name("default-realm")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .compactOnLaunch()
                .inMemory()
                .build()
            // set this config as the default realm
            Realm.setDefaultConfiguration(config) // :emphasize:
            // :code-block-end:

            // :code-block-start: use-default-realm
            val realm = Realm.getDefaultInstance()
            Log.v("EXAMPLE","Successfully opened the default realm at: ${realm.path}")
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}