package com.mongodb.realm.realmkmmapp

import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import kotlin.test.Test

class AuthenticationTest: RealmTest() {

    @Test
    fun anonymousAuthTest() {
        // :snippet-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(Credentials.anonymous())
        }
        // :snippet-end:
    }

    @Test
    fun emailPasswordAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: email-password-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            // :remove-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :remove-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun confirmEmailPasswordUserTest() {
        val token = getRandom()
        val tokenId = getRandom()
        // :snippet-start: confirm-email-password-user
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            app.emailPasswordAuth.confirmUser(token, tokenId)
        }
        // :snippet-end:
    }

    @Test
    fun resetPasswordTest() {
        val token = getRandom()
        val tokenId = getRandom()
        val newPassword = getRandom()
        // :snippet-start: reset-password
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            app.emailPasswordAuth.resetPassword(token, tokenId, newPassword)
        }
        // :snippet-end:
    }

    @Test
    fun apiKeyAuthTest() {
        val key = "ZL0XzEnp44eKi2BZMDqfPoYW3YUajm7RRUVWalDQRYwc07a4JDUeEG4kHG1Y71ak"
        // :snippet-start: api-key-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(Credentials.apiKey(key))
        }
        // :snippet-end:
    }

    @Test
    fun appleAuthTest() {
        val idToken = getRandom()
        // :snippet-start: apple-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(Credentials.apple(idToken))
        }
        // :snippet-end:
    }

    @Test
    fun facebookAuthTest() {
        // Dependent on Android runtime. Tested in MainActivity.
    }

    @Test
    fun googleAuthTest() {
        // Dependent on Play Services. Tested in MainActivity.
    }

    @Test
    fun jwtAuthTest() {
        val jwtToken = getRandom()
        // :snippet-start: jwt-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(Credentials.jwt(jwtToken))
        }
        // :snippet-end:
    }

    @Test
    fun logoutTest() {
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(Credentials.anonymous())
            // :snippet-start: log-out
            user.logOut()
            // :snippet-end:
        }
    }
}