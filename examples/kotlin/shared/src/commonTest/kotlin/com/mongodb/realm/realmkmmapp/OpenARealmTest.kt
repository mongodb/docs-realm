package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import kotlin.test.Test

class OpenARealmTest: RealmTest() {
    @Test
    fun openAndCloseARealmTest() {
        val REALM_NAME = getRandom()
        runBlocking {
            // :code-block-start: open-a-realm
            val config = RealmConfiguration.Builder()
                // specify name so realm doesn't just use the "default.realm" file
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-end:
            // :code-block-start: close-a-realm
            realm.close()
            // :code-block-end:
        }
    }
}