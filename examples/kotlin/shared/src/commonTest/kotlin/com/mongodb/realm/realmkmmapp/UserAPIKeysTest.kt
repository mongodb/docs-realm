package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.internal.platform.runBlocking
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.random.Random
import co.touchlab.kermit.Kermit


class UserAPIKeysTest : RealmTest() {
    private val random = Random
    private val app = App.create(YOUR_APP_ID)
    private var email: String? = null
    private var password: String? = null
    private val kermit = Kermit()

    @BeforeTest
    fun setup() {
        email = "api-key-user@example.com" + random.nextInt(10000000)
        password = "123456"
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            app.emailPasswordAuth.registerUser(email!!, password!!)
            kermit.i { "setup: successfully logged in with $email and $password" }
        }
    }

    @Test
    fun createApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: create-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth

            // Create an API key for the logged-in user
            val key = provider.create("apiKeyName")
// :snippet-end:
            check(key.name == "apiKeyName")
            checkNotNull(key.value)
            checkNotNull(key.id)
            check(key.enabled)

            user.logOut()
            check(!user.loggedIn)
        }
    }

    @Test
    fun fetchApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: fetch-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("foo")
            val key1 = provider.create("foo1")
            val key2 = provider.create("foo2")
            // :remove-end:

            // Get all keys for the logged-in user
            val apiKeys = provider.fetchAll()

            // Get a specific key by its ID
            val apiKey = provider.fetch(key.id)
// :snippet-end:
            kermit.i { "fetchAll: $apiKeys" }
            kermit.i { "fetch: $apiKey" }

            user.logOut()
            check(!user.loggedIn)
        }
    }

    @Test
    fun disableApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: enable-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("anotherApiKey")
            // :remove-end:

            // Enable a specified API key that's currently disabled
            provider.enable(key.id)

            // Disable a specified API key that's currently enabled
            provider.disable(key.id)
// :snippet-end:
            //check(!key.enabled)

            user.logOut()
            check(!user.loggedIn)
        }
    }

    @Test
    fun deleteKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: delete-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("foo")
            val keyId = provider.fetch(key.id)
            checkNotNull(keyId)
            // :remove-end:

            // Delete the specified API key
            provider.delete(key.id)
// :snippet-end:
            //check(keyId == null)

            user.logOut()
            check(!user.loggedIn)
        }
    }


    @AfterTest
    fun teardown() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            val user = app.login(credentials)
            user.delete()
            check(app.currentUser == null)
            kermit.i { "teardown: `${app.currentUser}` deleted" }
        }
    }
}