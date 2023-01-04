package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.internal.platform.runBlocking
import kotlin.test.Test

class OpenARealmTest: RealmTest() {
    @Test
    fun openAndCloseARealmTest() {
        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                // :remove-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :remove-end:
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
            // :snippet-start: close-a-realm
            realm.close()
            // :snippet-end:
        }
    }
    @Test
    fun onAnInMemoryRealm() {
        runBlocking {
            // :snippet-start: open-an-in-memory-realm
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                .inMemory()
                .build()

            val realm = Realm.open(config)
            Log.v("Successfully opened an in memory realm")
            // :snippet-end:
            realm.close()
        }
    }
}