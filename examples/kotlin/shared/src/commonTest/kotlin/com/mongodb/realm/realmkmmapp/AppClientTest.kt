package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.log.LogLevel
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.AppConfiguration
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.exceptions.ConnectionException
import io.realm.kotlin.mongodb.exceptions.InvalidCredentialsException
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

    @Test
    fun testErrorHandlingTest() {
        runBlocking {
            // :snippet-start: handle-errors
            val app = App.create(YOUR_APP_ID)
            runCatching {
                app.login(Credentials.anonymous())
            }.onSuccess {
                Log.v("Successfully logged in")
            }.onFailure { ex: Throwable ->
                when (ex) {
                    is InvalidCredentialsException -> {
                        Log.v("Invalid username or password. Please try again.")
                    }
                    is ConnectionException -> {
                        Log.e(ex.toString())
                    }
                    else -> {
                        Log.e(ex.toString())
                    }
                }
            }
            // :snippet-end:
        }
    }
}