package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.MutableSubscriptionSet
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import kotlin.test.Test
import kotlin.test.assertEquals

class SyncTest: RealmTest() {
    @Test
    fun openASyncedRealmTest() {
        val PARTITION = getRandom()

        // :snippet-start: open-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.close()
            // :remove-start:
            assertEquals(PARTITION, realm.configuration.name)
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun configureASyncedRealmTest() {
        val PARTITION = getRandom()
        // :snippet-start: configure-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                .maxNumberOfActiveVersions(10)
                .waitForInitialRemoteData()
                .name("realm name")
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :snippet-end:
    }

    @Test
    fun openAFlexibleSyncRealmTest() {
        val PARTITION = getRandom()
        val YOUR_APP_ID = FLEXIBLE_APP_ID

        // :snippet-start: open-a-flexible-sync-realm
        val app = App.create(YOUR_APP_ID)
        // use constants for query names so you can edit or remove them later
        val NAME_QUERY = "NAME_QUERY"
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, setOf(Movie::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Movie>(
                            "name == $0",
                            "name value"
                        ),
                        "query name"
                    )
                }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.close()
            // :remove-start:
            assertEquals(PARTITION, realm.configuration.name)
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun configureAFlexibleSyncRealmTest() {
        val PARTITION = getRandom()
        val YOUR_APP_ID = FLEXIBLE_APP_ID
        // :snippet-start: configure-a-flexible-sync-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, setOf(Movie::class))
                .maxNumberOfActiveVersions(10)
                .waitForInitialRemoteData()
                .name("realm name")
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Movie>(
                            "name == $0",
                            "name value"
                        ),
                        "query name"
                    )
                }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :snippet-end:
    }
}