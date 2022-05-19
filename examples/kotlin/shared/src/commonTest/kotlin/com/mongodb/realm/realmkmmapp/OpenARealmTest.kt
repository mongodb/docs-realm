package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.internal.platform.runBlocking
import kotlin.test.Test

class OpenARealmTest: RealmTest() {
    @Test
    fun openAndCloseARealmTest() {
        val REALM_NAME = getRandom()
        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                // :hide-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :hide-end:
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
            // :snippet-start: close-a-realm
            realm.close()
            // :snippet-end:
        }
    }
}