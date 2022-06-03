package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.log.LogLevel
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.AppConfiguration
import kotlin.test.Test

class AppClientTest: RealmTest() {
    @Test
    fun initializeAppClientTest() {
        // :snippet-start: initialize-app-client
        val app = App.create(YOUR_APP_ID)
        // :snippet-end:
    }

    @Test
    fun configureAppClientTest() {
        // :snippet-start: configure-app-client
        App.create(
            AppConfiguration.Builder(YOUR_APP_ID)
            .log(LogLevel.ALL)
            .build())
        // :snippet-end:
    }
}