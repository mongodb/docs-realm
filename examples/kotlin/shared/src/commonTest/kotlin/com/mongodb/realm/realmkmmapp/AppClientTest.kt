package com.mongodb.realm.realmkmmapp

import io.realm.log.LogLevel
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import kotlin.test.Test

class AppClientTest: RealmTest() {
    @Test
    fun initializeAppClientTest() {
        // :code-block-start: initialize-app-client
        val app = App.create(YOUR_APP_ID)
        // :code-block-end:
    }

    @Test
    fun configureAppClientTest() {
        // :code-block-start: configure-app-client
        App.create(
            AppConfiguration.Builder(YOUR_APP_ID)
            .log(LogLevel.ALL)
            .build())
        // :code-block-end:
    }
}