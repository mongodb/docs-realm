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
            // :code-block-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file
                .name(REALM_NAME)
                // :hide-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :hide-end:
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