package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import kotlin.test.Test
import kotlin.test.assertEquals

class SyncTest: RealmTest() {
    @Test
    fun openASyncedRealmTest() {
        val PARTITION = getRandom()

        // :code-block-start: open-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                // :hide-start:
                .directory(TMP_PATH)
                // :hide-end:
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.close()
            // :hide-start:
            assertEquals(PARTITION, realm.configuration.name)
            // :hide-end:
        }
        // :code-block-end:
    }

    @Test
    fun configureASyncedRealmTest() {
        val PARTITION = getRandom()
        // :code-block-start: configure-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                .directory(TMP_PATH) // :hide:
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .maxNumberOfActiveVersions(10)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :code-block-end:
    }
}