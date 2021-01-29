package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.sync.SyncConfiguration
import org.junit.Test
import java.security.SecureRandom
import java.util.*


class EncryptTest : RealmTest() {
    @Test
    fun encrypt() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val random = Random()
            val PARTITION = "encrypted_" + random.nextInt(10000)
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    val user = it.get()
                    // Generate a key
                    val key = ByteArray(64)
                    SecureRandom().nextBytes(key)
                    val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .encryptionKey(key)
                            .build()
                    // Open the encrypted realm
                    val realm = Realm.getInstance(config)
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error}")
                }
            }
        }
        expectation.await()
    }
}
