package com.mongodb.realm.examples.kotlin

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration

import org.junit.Test
import org.junit.runner.RunWith
import java.util.concurrent.TimeUnit

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class InitializeTest : RealmTest() {

    @Test
    fun testAccessAppClient() {
        val appID : String = YOUR_APP_ID // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID).build())
    }

    @Test
    fun testAdvancedAccessAppClient() {
        val appID = YOUR_APP_ID // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID)
            .appName("My App")
            .requestTimeout(30, TimeUnit.SECONDS)
            .build())
    }
}