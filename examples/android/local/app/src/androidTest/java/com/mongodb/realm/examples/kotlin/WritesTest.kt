package com.mongodb.realm.examples.kotlin

import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream

class WritesTest : RealmTest() {
    @Test
    fun testCreateObjectFromJSON() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .name("create-object-from-json")
                .build()
            val realm = Realm.getInstance(config)
            try {
                // :code-block-start: create-an-object-json
                // Insert from a string
                realm.executeTransaction { realm ->
                    realm.createObjectFromJson(Frog::class.java,
                        "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }")
                }

                // Insert multiple items using an InputStream
                realm.executeTransaction { realm ->
                    try {
                        val inputStream: InputStream =
                            FileInputStream(File("path_to_file"))
                        realm.createAllFromJson(Frog::class.java, inputStream)
                    } catch (e: IOException) {
                        throw RuntimeException(e)
                    }
                }
                // :code-block-end:
            } catch (e: Exception) { // this should throw when "path_to_file" doesn't resolve to a real file
                expectation.fulfill()
            }
            realm.close()
        }
        expectation.await()
    }
  
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