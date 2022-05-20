package com.mongodb.realm.realmkmmapp

import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import kotlin.test.Test

class AuthenticationTest: RealmTest() {

    @Test
    fun anonymousAuthTest() {
        // :snippet-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID)
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
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun confirmEmailPasswordUserTest() {
        val token = getRandom()
        val tokenId = getRandom()
        // :snippet-start: confirm-email-password-user
        val app: App = App.create(YOUR_APP_ID)
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
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            app.emailPasswordAuth.resetPassword(token, tokenId, newPassword)
        }
        // :snippet-end:
    }

    @Test
    fun apiKeyAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: api-key-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun appleAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: apple-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun facebookAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: facebook-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun googleAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: google-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun jwtAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: jwt-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun logoutTest() {
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            // :snippet-start: log-out
            user.logOut()
            // :snippet-end:
        }
    }
}