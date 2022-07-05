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
        var email = getRandom()
        var password = getRandom()
        runBlocking {
            // :snippet-start: handle-errors
            val app = App.create(YOUR_APP_ID)
            runCatching {
                app.login(Credentials.emailPassword(email, password))
            }.onSuccess {
                Log.v("Successfully logged in")
                // transition to another activity, load a fragment, to display logged-in user information here
            }.onFailure { ex: Throwable ->
                when (ex) {
                    is InvalidCredentialsException -> {
                        Log.v("Failed to login due to invalid credentials: ${ex.message}")
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Invalid username or password. Please try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }
                    is ConnectionException -> {
                        Log.e("Failed to login due to a connection error: ${ex.message}")
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Login failed due to a connection error. Check your network connection and try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }
                    else -> {
                        Log.e("Failed to login: ${ex.message}")
                        // generic error message for niche and unknown fail cases
                        // :uncomment-start:
                        // Toast.makeText(baseContext,
                        //     "Login failed. Please try again.", Toast.LENGTH_LONG).show()
                        // :uncomment-end:
                    }
                }
            }
            // :snippet-end:
        }
    }
}