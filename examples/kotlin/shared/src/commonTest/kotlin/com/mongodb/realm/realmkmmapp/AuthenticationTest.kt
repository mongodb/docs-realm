package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import kotlin.test.Test

class AuthenticationTest: RealmTest() {

    @Test
    fun linkCredentialsTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: link-credentials
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous()) // logs in with an anonymous user
            // registers an email and password user
            app.emailPasswordAuth.registerUser(email, password)
            // link anonymous user with email password credentials
            user.linkCredentials(Credentials.emailPassword(email, password));
        }
        // :snippet-end:
    }

    @Test
    fun anonymousAuthTest() {
        // :snippet-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous())
        }
        // :snippet-end:

        // :snippet-start: anonymous-authentication-reuse-existing
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // logs in with an existing anonymous user, as long as the user hasn't logged out
            val user = app.login(Credentials.anonymous(reuseExisting = true))
        }
        // :snippet-end:
    }

    @Test
    fun emailPasswordAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: email-password-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :remove-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :remove-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :snippet-end:
    }

    @Test
    fun deleteUserTest(){
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: user-delete
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :remove-start:
            app.emailPasswordAuth.registerUser(email, password)
            val credentials = Credentials.emailPassword(email, password)
            // :remove-end:
            val user = app.login(credentials)
            // use the user object ...

            // later, delete the user object
            user.delete() // regardless of which provider you used to login, you can logout using `delete()`
        }
        // :snippet-end:
    }

    @Test
    fun confirmEmailPasswordUserTest() {
        val token = getRandom()
        val tokenId = getRandom()
        // :snippet-start: confirm-email-password-user
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :uncomment-start:
            // app.emailPasswordAuth.confirmUser(token, tokenId)
            // :uncomment-end:
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
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :uncomment-start:
            // app.emailPasswordAuth.resetPassword(token, tokenId, newPassword)
            // :uncomment-end:
        }
        // :snippet-end:
    }

    @Test
    fun apiKeyAuthTest() {
        val email = getRandom()
        val password = getRandom()
        val randomKeyString = getRandom()

        // :snippet-start: api-key-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :remove-start:
            // Register and login a temporary user to create an API key
            app.emailPasswordAuth.registerUser(email, password)
            val tempUser = app.login(Credentials.emailPassword(email, password))
            val apiKey = tempUser.apiKeyAuth.create(randomKeyString)
            // API Key value in string form
            val key = apiKey.value!!
            // :remove-end:
            val user = app.login(Credentials.apiKey(key))
            // :remove-start:
            // delete the key so we're not constantly creating new user api keys
            tempUser.apiKeyAuth.delete(apiKey.id)
            tempUser.logOut()
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun appleAuthTest() {
        val idToken = getRandom()
        // :snippet-start: apple-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :uncomment-start:
            // val user = app.login(Credentials.apple(idToken))
            // :uncomment-end:
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
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :uncomment-start:
            // val user = app.login(Credentials.jwt(jwtToken))
            // :uncomment-end:
        }
        // :snippet-end:
    }

    @Test
    fun accessTokenTest() {
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous())
            // :snippet-start: access-token-get
            val token = user.accessToken
            // :snippet-end:
            // :snippet-start: access-token-refresh
            // Gets the current refresh token for the user
            fun getRefreshToken(): String {
                return user.refreshToken
            }
            // :snippet-end:
            user.logOut()
        }

    }

    @Test
    fun logoutTest() {
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous())
            // :snippet-start: log-out
            user.logOut()
            // :snippet-end:
        }
    }
}