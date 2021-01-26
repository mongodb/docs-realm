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
                        mongoClient.getDatabase("custom-user-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("custom-user-data-collection")
                    mongoCollection.insertMany(
                        Arrays.asList(
                            Plant(ObjectId(),
                                "venus flytrap",
                                "full",
                                "white",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(ObjectId(),
                                "sweet basil",
                                "partial",
                                "green",
                                "annual",
                                "Store 42"
                            ),
                            Plant(ObjectId(),
                                "thai basil",
                                "partial",
                                "green",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(ObjectId(),
                                "helianthus",
                                "full",
                                "yellow",
                                "annual",
                                "Store 42"
                            ),
                            Plant(ObjectId(),
                                "petunia",
                                "full",
                                "purple",
                                "annual",
                                "Store 47"
                            )
                        )
                    )
                    Log.v("EXAMPLE", "Successfully Successfully inserted the sample data.")
                    expectation.fulfill()
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
                        mongoClient.getDatabase("custom-user-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("custom-user-data-collection")
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    expectation.fulfill()
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }
}
