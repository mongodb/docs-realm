package com.mongodb.realm.examples.kotlin

import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test

class WritesTest : RealmTest() {
    @Test
    fun testIterate() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name("writes-test-iterate")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .build()
            val realm = Realm.getInstance(config)
            // :code-block-start: iterate
            val frogs = realm.where(Frog::class.java)
                .equalTo("species", "bullfrog")
                .findAll()

            // Use an iterator to rename the species of all bullfrogs
            realm.executeTransaction {
                for (frog in frogs) {
                    frog.species = "Lithobates catesbeiana"
                }
            }

            // Use a snapshot to rename the species of all bullfrogs
            realm.executeTransaction {
                val frogsSnapshot = frogs.createSnapshot()
                for (i in frogsSnapshot.indices) {
                    frogsSnapshot[i]!!.species = "Lithobates catesbeiana"
                }
            }
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}