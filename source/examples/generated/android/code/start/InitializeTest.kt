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