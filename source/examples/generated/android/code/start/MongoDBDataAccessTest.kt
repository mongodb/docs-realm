package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.Plant
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.bson.Document
import org.bson.types.ObjectId
import org.junit.Before
import org.junit.Test
import java.util.*


class MongoDBDataAccessTest : RealmTest() {
    @Before
    fun setUpData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    mongoCollection.insertMany(
                        Arrays.asList(
                            Plant(
                                ObjectId(),
                                "venus flytrap",
                                "full",
                                "white",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "sweet basil",
                                "partial",
                                "green",
                                "annual",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "thai basil",
                                "partial",
                                "green",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "helianthus",
                                "full",
                                "yellow",
                                "annual",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "petunia",
                                "full",
                                "purple",
                                "annual",
                                "Store 47"
                            )
                        )
                    )
                    Log.v("EXAMPLE", "Successfully Successfully inserted the sample data.")
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun instantiateAMongoDBCollectionHandle() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }


    @Test
    fun insertASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    val plant = Plant(
                        ObjectId(),
                        "lily of the valley",
                        "full",
                        "white",
                        "perennial",
                        "Store 47")
                    mongoCollection?.insertOne(plant)?.getAsync() { task ->
                        if (it.isSuccess) {
                            Log.v("EXAMPLE", "successfully inserted a document with id: ${task.get().insertedId}")
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
                        }
                    }
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }


    @Test
    fun insertMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v(
                        "EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle"
                    )
                    val plants = Arrays.asList(
                        Plant(
                            ObjectId(),
                            "rhubarb",
                            "full",
                            "red",
                            "perennial",
                            "Store 47"
                        ),
                        Plant(
                            ObjectId(),
                            "wisteria lilac",
                            "partial",
                            "purple",
                            "perennial",
                            "Store 42"
                        ),
                        Plant(
                            ObjectId(),
                            "daffodil",
                            "full",
                            "yellow",
                            "perennial",
                            "Store 42"
                        )
                    )
                    mongoCollection.insertMany(plants).getAsync { task ->
                        if (task.isSuccess) {
                            val insertedCount = task.get().insertedIds.size
                            Log.v("EXAMPLE", "successfully inserted $insertedCount documents into the collection.")
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
                        }
                    }
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun findASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v(
                        "EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle"
                    )
                    val queryFilter = Document("type", "perennial")
                    mongoCollection.findOne(queryFilter)
                        .getAsync { task ->
                            if (task.isSuccess) {
                                val result = task.get()
                                Log.v("EXAMPLE", "successfully found a document: $result")
                            } else {
                                Log.e("EXAMPLE", "failed to find document with: ${task.error}")
                            }
                        }
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }

    @Test
    fun findMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v(
                        "EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle"
                    )
                    val queryFilter = Document("_partition", "Store 42")
                    val findTask = mongoCollection.find(queryFilter).iterator()
                    findTask.getAsync { task ->
                        if (task.isSuccess) {
                            val results = task.get()
                            Log.v("EXAMPLE", "successfully found all plants for Store 42:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                        } else {
                            Log.e("EXAMPLE", "failed to find documents with: ${task.error}")
                        }
                    }
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }
}
