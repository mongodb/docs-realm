package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.*
import io.realm.kotlin.mongodb.User
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.customDataAsBsonDocument
import io.realm.kotlin.mongodb.ext.profileAsBsonDocument
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.mongodb.kbson.BsonDocument
import org.mongodb.kbson.BsonInt32
import org.mongodb.kbson.BsonString
import kotlin.test.*

// :replace-start: {
//   "terms": {
//     "updatedUserData2": "updatedUserData",
//     "hideNotReusingAnonymousUser": "Credentials.anonymous()"
//   }
// }
class AuthenticationTest: RealmTest() {

    private val hideNotReusingAnonymousUser = Credentials.anonymous(reuseExisting = false)

    @Test
    fun linkCredentialsTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: link-credentials
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(hideNotReusingAnonymousUser) // logs in with an anonymous user
            // registers an email/password user
            app.emailPasswordAuth.registerUser(email, password)
            // links anonymous user with email/password credentials
            user.linkCredentials(Credentials.emailPassword(email, password));
            // :remove-start:
            // Login with the email/password user, and confirm it is the same user as the anonymous user
            val emailPasswordUser = app.login(Credentials.emailPassword(email, password))
            assertEquals(user, emailPasswordUser)
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun anonymousAuthTest() {
        // :snippet-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous())
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
        }
        // :snippet-end:

        // :snippet-start: anonymous-authentication-reuse-existing
        runBlocking {
            // Logs in with anonymous user
            val anonUser = app.login(Credentials.anonymous())
            assertEquals(User.State.LOGGED_IN, anonUser.state)// :remove:

            // Creates a new anonymous user
            val otherAnonUser =
                app.login(Credentials.anonymous(reuseExisting = false))
            // :remove-start:
            assertEquals(User.State.LOGGED_IN, otherAnonUser.state)
            assertNotEquals(anonUser, otherAnonUser)
            // :remove-end:
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
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
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

            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
            // later, delete the user object
            user.delete() // regardless of which provider you used to login, you can logout using `delete()`
            assertEquals(User.State.REMOVED, user.state) // :remove:
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
            assertEquals(User.State.LOGGED_IN, tempUser.state)
            val apiKey = tempUser.apiKeyAuth.create(randomKeyString)
            // API Key value in string form
            val key = apiKey.value!!
            // :remove-end:
            val user = app.login(Credentials.apiKey(key))
            // :remove-start:
            assertEquals(User.State.LOGGED_IN, user.state)
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
        assertFails(message = "token contains an invalid number of segments", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.apple(idToken))
        }
        // :snippet-end:
        } )
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
        assertFails(message = "token contains an invalid number of segments", block = { // :remove:
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.jwt(jwtToken))
        }
        // :snippet-end:
        } )
    }

    @Test
    fun accessTokenTest() {
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            val user = app.login(Credentials.anonymous())
            // :snippet-start: access-token-get
            val token = user.accessToken
            // :snippet-end:
            assertNotNull(token)
            // :snippet-start: access-token-refresh
            // Gets the current refresh token for the user
            fun getRefreshToken(): String {
                return user.refreshToken
            }
            // :snippet-end:
            val refreshToken = getRefreshToken()
            assertNotNull(refreshToken)
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
            assertEquals(User.State.LOGGED_IN, currentUser.state)
            // :snippet-start: retrieve-current-user
            val user = app.currentUser
            // :snippet-end:
            assertNotNull(user)
        }
    }

    @Test
    fun customUserDataTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: read-custom-user-data
            val user = app.currentUser!!
            val customUserData = user.customDataAsBsonDocument()
            // :snippet-end:
            // At this point, there is no custom user data
            assertNull(customUserData)
            // :snippet-start: refresh-custom-user-data
            // Update the custom data object
            user.refreshCustomData()

            // Now when you access the custom data, it's the
            // updated data object
            val updatedUserData = user.customDataAsBsonDocument()
            // :snippet-end:
            // Still no custom user data because we haven't written it
            assertNull(updatedUserData)

            // :snippet-start: write-custom-user-data
            // Write the custom user data through a call
            // to the `writeCustomUserData` function
            val functionResponse = user.functions
                .call<BsonDocument>("writeCustomUserData",
                    mapOf("userId" to user.id, "favoriteColor" to "blue")
                )

            assertIs<BsonDocument>(functionResponse) // :remove:
            // Refreshed custom user data contains updated
            // `favoriteColor` value added in above Atlas Function call
            user.refreshCustomData()
            val updatedUserData2 = user.customDataAsBsonDocument()
            // :snippet-end:
            assertNotNull(updatedUserData2)
            assertEquals(BsonString("blue"), updatedUserData2["favoriteColor"])
            // :snippet-start: delete-custom-user-data
            val deleteResponse = user.functions
                .call<BsonDocument>("deleteCustomUserData")
            // :snippet-end:
            assertNotNull(deleteResponse)
            assertEquals(BsonInt32(1), deleteResponse["deletedCount"])
            user.logOut()
        }
    }
    @Test
    fun logoutTest() {
        val email = getRandom()
        val password = getRandom()
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // This has to be an email/password user because logging out an anonymous user
            // sets their state to REMOVED instead of LOGGED_OUT
            app.emailPasswordAuth.registerUser(email, password)
            val user = app.login(Credentials.emailPassword(email, password))
            // :snippet-start: log-out
            user.logOut()
            // :snippet-end:
            assertEquals(User.State.LOGGED_OUT, user.state)
        }
    }

    @Test
    fun authAsFlowTest() {
        val email = getRandom()
        val password = getRandom()
        var appActivityFunCalled = false
        var loginActivityFunCalled = false
        fun proceedToAppActivity(user: io.realm.kotlin.mongodb.User) {
            // Placeholder func for example
            Log.v("User ${user.id.toString()} is logged in")
            appActivityFunCalled = true
        }
        fun proceedToLoginActivity(user: io.realm.kotlin.mongodb.User) {
            // Placeholder func for example
            Log.v("User ${user.id.toString()} is logged out")
            loginActivityFunCalled = true
        }
        fun proceedToRemovedUserActivity(user: io.realm.kotlin.mongodb.User) {
            // Placeholder func for example
        }
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking { // use runBlocking sparingly -- it can delay UI interaction
            // flow.collect() is blocking -- for this example we run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                // :snippet-start: auth-change-listener
                // Create a Flow of AuthenticationChange objects
                app.authenticationChangeAsFlow().collect() { change: AuthenticationChange ->
                    when (change) {
                        is LoggedIn -> proceedToAppActivity(change.user)
                        is LoggedOut -> proceedToLoginActivity(change.user)
                        is Removed -> proceedToRemovedUserActivity(change.user)
                    }
                }
                // :snippet-end:
            }
            app.emailPasswordAuth.registerUser(email, password)
            val user = app.login(Credentials.emailPassword(email, password))
            delay(10)
            assertTrue(appActivityFunCalled)
            user.logOut()
            delay(20)
            assertTrue(loginActivityFunCalled)
            job.cancel()
        }
    }

    @Test
    fun userMetaData() {
        val email = getRandomEmail()
        val password = getRandom()
        val app = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)

            // :snippet-start: get-user-metadata
            // Log in a user
            val user = app.login(Credentials.emailPassword(email, password))

            // Access the user's metadata
            val userEmail = user.profileAsBsonDocument()["email"]
            Log.i("The logged-in user's email is: $userEmail")
            // :snippet-end:
            assertEquals(email, userEmail?.asString()?.value)
            user.delete()
            app.close()
        }
    }
}
// :replace-end:
