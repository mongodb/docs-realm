package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import kotlin.test.Test

class CRUDTest: RealmTest() {
    @Test
    fun createNewObjectTest() {
        val PARTITION = getRandom()

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: create-a-new-object

            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun findObjectByPrimaryKeyTest() {
        val PARTITION = getRandom()

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: find-object-by-primary-key

            // :code-block-end:
            realm.close()
        }
    }
}