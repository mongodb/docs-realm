package com.mongodb.realm.examples

import android.util.Log
import androidx.lifecycle.Lifecycle
import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.junit.Assert

import org.junit.Test
import org.junit.runner.RunWith
import java.util.concurrent.TimeUnit

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class InitializeTestKotlin : RealmTest() {

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