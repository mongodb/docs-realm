package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.AuthenticationChange
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.LoggedIn
import io.realm.kotlin.mongodb.LoggedOut
import io.realm.kotlin.mongodb.Removed
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.customDataAsBsonDocument
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.mongodb.kbson.BsonDocument
import kotlin.test.Test
import kotlin.test.assertTrue

// :replace-start: {
//   "terms": {
//     "updatedUserData2": "updatedUserData"
//   }
// }
class AuthenticationTest: RealmTest() {

    @Test
    fun linkCredentialsTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: link-credentials
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous()) // logs in with an anonymous user
            // registers an email/password user
            app.emailPasswordAuth.registerUser(email, password)
            // links anonymous user with email/password credentials
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
        runBlocking {
            // Logs in with anonymous user
            val anonUser = app.login(Credentials.anonymous())

            // Creates a new anonymous user
            val otherAnonUser =
                app.login(Credentials.anonymous(reuseExisting = false))
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
    fun deleteUserTest() {
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
    fun customFunctionTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            // :snippet-start: custom-function-authentication
            val customCredentials = Credentials.customFunction(
                payload = mapOf("username" to "bob")
            )

            // Pass the generated credential to app.login()
            val currentUser = app.login(customCredentials)
            // :snippet-end:
            // :snippet-start: retrieve-current-user
            val user = app.currentUser
            // :snippet-end:
        }
    }

    @Test
    fun customUserDataTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.login(Credentials.anonymous())
            // :snippet-start: read-custom-user-data
            val user = app.currentUser!!
            val customUserData = user.customDataAsBsonDocument()
            // :snippet-end:

            // :snippet-start: refresh-custom-user-data
            // Update the custom data object
            user.refreshCustomData()

            // Now when you access the custom data, it's the
            // updated data object
            val updatedUserData = user.customDataAsBsonDocument()
            // :snippet-end:

            // :snippet-start: write-custom-user-data
            // Write the custom user data through a call
            // to the `writeCustomUserData` function
            val functionResponse = user.functions
                .call<BsonDocument>("writeCustomUserData",
                    mapOf("userId" to user.id, "favoriteColor" to "blue")
                )

            // Refreshed custom user data contains updated
            // `favoriteColor` value added in above Atlas Function call
            user.refreshCustomData()
            val updatedUserData2 = user.customDataAsBsonDocument()
            // :snippet-end:
            // :snippet-start: delete-custom-user-data
            val deleteResponse = user.functions
                .call<BsonDocument>("deleteCustomUserData")
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

    @Test
    fun authAsFlowTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: auth-change-listener
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val authChanges = mutableSetOf<AuthenticationChange>()
            // flow.collect() is blocking -- for this example we run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                // Create a Flow of AuthenticationChange objects
                app.authenticationChangeAsFlow().collect() { change: AuthenticationChange ->
                    when (change) {
                        is LoggedIn -> authChanges.add(change)
                        is LoggedOut -> authChanges.add(change)
                        is Removed -> authChanges.add(change)
                    }
                }
            }
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            // After logging in, you should see AuthenticationChange is LoggedIn
            val user = app.login(Credentials.emailPassword(email, password))
            // :remove-start:
            delay(10)
            assertTrue(authChanges.first() is LoggedIn)
            // :remove-end:
            if (authChanges.first() is LoggedIn) {
                Log.v("User ${authChanges.first().user} is logged in")
            }
            authChanges.clear()
            // After logging out, observe the AuthenticationChange
            user.logOut()
            // :remove-start:
            delay(20)
            assertTrue(authChanges.first() is LoggedOut)
            // :remove-end:
            if (authChanges.first() is LoggedOut) {
                Log.v("User ${authChanges.first().user} is logged out")
            }
            job.cancel()
        }
        // :snippet-end:
    }
}
// :replace-end:
