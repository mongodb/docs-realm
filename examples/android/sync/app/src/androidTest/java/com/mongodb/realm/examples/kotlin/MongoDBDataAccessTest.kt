package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.junit.Test


class MongoDBDataAccessTest : RealmTest() {

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
                    // :code-block-start: instantiate-a-mongodb-collection-handle
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                    val mongoDatabase =
                        mongoClient.getDatabase("custom-user-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("custom-user-data-collection")
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :hide-start:
                    expectation.fulfill()
                    // :hide-end:
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }
}
