package com.mongodb.realm.examples.kotlin

import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration

import org.junit.Test
import java.util.concurrent.TimeUnit

class InitializeTest : RealmTest() {

    @Test
    fun testAccessAppClient() {
        // :code-block-start: access-app-client
        val appID : String = YOUR_APP_ID // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID).build())
        // :code-block-end:
    }

    @Test
    fun testAdvancedAccessAppClient() {
        // :code-block-start: advanced-access-app-client
        val appID = YOUR_APP_ID // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID)
            .appName("My App")
            .requestTimeout(30, TimeUnit.SECONDS)
            .build())
        // :code-block-end:
    }
}