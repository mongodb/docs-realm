package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.auth.ApiKey
import io.realm.kotlin.internal.platform.runBlocking
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import java.util.*
import kotlin.random.Random
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlin.test.fail
import co.touchlab.kermit.Kermit
import co.touchlab.kermit.Logger

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
            kermit.i { "$user now has an API Key '${key.name}: ${key.id}'" }

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
            kermit.i { "fetchAll: $apiKeys"}
            kermit.i { "fetch: $apiKey"}
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
            val key = provider.create("anotherKey")
            // :remove-end:

            // Enable a specified API key
            provider.enable(key.id)

            // Disable a specified API key
            provider.disable(key.id)
// :snippet-end:
            kermit.i { "${key.name}: Enabled is ${key.enabled}" }
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
            val key = provider.create("rab")
            // :remove-end:

            // Delete the specified API key
            // Once deleted, keys cannot be recovered
            provider.delete(key.id)
// :snippet-end:
            //check(key.id == null)
            user.logOut()
            check(!user.loggedIn)
        }
    }
    @AfterTest
    fun tearDown() {
        runBlocking {
            val user = app.currentUser!!
            user.delete()
        }
        kermit.i { "teardown: user is successfully deleted" }
    }
}

