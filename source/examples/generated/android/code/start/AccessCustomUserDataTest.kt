package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.mongo.MongoClient
import io.realm.mongodb.mongo.MongoCollection
import io.realm.mongodb.mongo.MongoDatabase
import org.bson.Document
import org.junit.Test

class AccessCustomUserDataTest : RealmTest() {
    @Test
    fun testReadCustomUserData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            val anonymousCredentials: Credentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val user = app.currentUser()
                    val customUserData : Document? = user?.customData
                    Log.v("EXAMPLE", "Fetched custom user data: $customUserData")
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test
    fun createCustomUserData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            val anonymousCredentials: Credentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    val user = app.currentUser()
                    val mongoClient : MongoClient =
                        user?.getMongoClient("mongodb-atlas")!! // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase : MongoDatabase =
                        mongoClient.getDatabase("custom-user-data-database")!!
                    val mongoCollection : MongoCollection<Document> =
                        mongoDatabase.getCollection("custom-user-data-collection")!!
                    mongoCollection.insertOne(Document("user-id-field", user.id).append("favoriteColor", "pink"))
                        .getAsync { result ->
                            if (result.isSuccess) {
                                Log.v("EXAMPLE", "Inserted custom user data document. _id of inserted document: ${result.get().insertedId}")
                            } else {
                                Log.e("EXAMPLE", "Unable to insert custom user data. Error: ${result.error}")
                            }
                        }
                } else {
                    Log.e("EXAMPLE", "Failed to log in anonymously: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun updateCustomUserData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            val anonymousCredentials: Credentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    val user = app.currentUser()
                    val mongoClient : MongoClient =
                        user?.getMongoClient("mongodb-atlas")!! // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase : MongoDatabase =
                        mongoClient.getDatabase("custom-user-data-database")!!
                    val mongoCollection : MongoCollection<Document> =
                        mongoDatabase.getCollection("custom-user-data-collection")!!
                    mongoCollection.updateOne(Document("user-id-field", user.id), Document("favoriteColor", "cerulean"))
                        .getAsync { result ->
                            if (result.isSuccess) {
                                if (result.get().modifiedCount == 1L) {
                                    Log.v("EXAMPLE", "Updated custom user data document.")
                                } else {
                                    Log.v("EXAMPLE", "Could not find custom user data document to update.")
                                }
                            } else {
                                Log.e("EXAMPLE", "Unable to update custom user data. Error: ${result.error}")
                            }
                        }
                } else {
                    Log.e("EXAMPLE", "Failed to log in anonymously: ${it.error}")
                }
            }
        }
        expectation.await()
    }
}