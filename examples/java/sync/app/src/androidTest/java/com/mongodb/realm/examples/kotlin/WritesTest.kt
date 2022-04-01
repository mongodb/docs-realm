package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.Turtle
import com.mongodb.realm.examples.model.TurtleEnthusiast
import io.realm.ImportFlag
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId
import org.junit.Test

class WritesTest : RealmTest() {
    @Test
    fun runATransaction() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            // :code-block-start: run-a-transaction
                            realm.executeTransaction { r: Realm ->
                                // Create a turtle enthusiast named Ali.
                                val ali = r.createObject(TurtleEnthusiast::class.java, ObjectId())
                                ali.name = "Ali"
                                // Find turtles younger than 2 years old
                                val hatchlings =
                                    r.where(Turtle::class.java).lessThan("age", 2).findAll()
                                // Give all hatchlings to Ali.
                                hatchlings.setObject("owner", ali)
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }

    @Test
    fun createAnObject() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            // :code-block-start: create-an-object
                            realm.executeTransaction { r: Realm ->
                                // Instantiate the class using the factory function.
                                val turtle = r.createObject(Turtle::class.java, ObjectId())
                                // Configure the instance.
                                turtle.name = "Max"
                                // Create a TurtleEnthusiast with a primary key.
                                val primaryKeyValue = ObjectId()
                                val turtleEnthusiast = r.createObject(
                                    TurtleEnthusiast::class.java,
                                    primaryKeyValue
                                )
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun upsertAnObject() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            // :code-block-start: upsert-an-object
                            realm.executeTransaction { r: Realm ->
                                val id = ObjectId()
                                val drew = TurtleEnthusiast()
                                drew._id = id
                                drew.name = "Drew"
                                drew.age = 25
                                // Add a new turtle enthusiast to the realm. Since nobody with this id
                                // has been added yet, this adds the instance to the realm.
                                r.insertOrUpdate(drew)
                                val andy = TurtleEnthusiast()
                                andy._id = id
                                andy.name = "Andy"
                                andy.age = 56
                                // Judging by the ID, it's the same turtle enthusiast, just with a different name.
                                // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
                                r.insertOrUpdate(andy)
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun copyToRealmOrUpdateWithSameValuesFlag() {
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
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            // :code-block-start: copy-or-update-same-values-flag
                            realm.executeTransaction { r: Realm ->
                                val id = ObjectId()
                                val drew = TurtleEnthusiast()
                                drew._id = id
                                drew.name = "Drew"
                                drew.age = 25
                                // Add a new turtle enthusiast to the realm. Since nobody with this id
                                // has been added yet, this adds the instance to the realm.
                                r.insertOrUpdate(drew)
                                val andy = TurtleEnthusiast()
                                andy._id = id
                                andy.name = "Andy"
                                // Judging by the ID, it's the same turtle enthusiast, just with a different name.
                                // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
                                r.copyToRealmOrUpdate(andy,
                                    ImportFlag.CHECK_SAME_VALUES_BEFORE_SET)
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun updateAnObject() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                realm.createObject(
                                    Turtle::class.java, ObjectId()
                                )
                            }
                            // :code-block-start: update-an-object
                            realm.executeTransaction { r: Realm ->
                                // Get a turtle to update.
                                val turtle = r.where(Turtle::class.java).findFirst()
                                // Update properties on the instance.
                                // This change is saved to the realm.
                                turtle!!.name = "Archibald"
                                turtle.age = 101
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun updateACollection() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                realm.createObject(
                                    Turtle::class.java, ObjectId()
                                )
                            }
                            // :code-block-start: update-a-collection
                            realm.executeTransaction { r: Realm ->
                                // Create a turtle enthusiast named Josephine.
                                val josephine = realm.createObject(
                                    TurtleEnthusiast::class.java,
                                    ObjectId()
                                )
                                josephine.name = "Josephine"

                                // Get all turtles named "Pierogi".
                                val turtles = r.where(Turtle::class.java)
                                    .equalTo("name", "Pierogi")
                                    .findAll()

                                // Give all turtles named "Pierogi" to Josephine
                                turtles.setObject("owner", josephine)
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun deleteAnObject() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                val tony = realm.createObject(
                                    Turtle::class.java,
                                    ObjectId()
                                )
                                tony.name = "Tony"
                            }
                            // :code-block-start: delete-an-object
                            realm.executeTransaction { r: Realm ->
                                // Get a turtle named "Tony".
                                var tony = r.where(Turtle::class.java)
                                    .equalTo("name", "Tony")
                                    .findFirst()
                                tony!!.deleteFromRealm()
                                // discard the reference
                                tony = null
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun deleteACollection() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                realm.createObject(
                                    Turtle::class.java, ObjectId()
                                )
                            }
                            // :code-block-start: delete-a-collection
                            realm.executeTransaction { r: Realm ->
                                // Find turtles older than 2 years old.
                                val oldTurtles = r.where(Turtle::class.java)
                                    .greaterThan("age", 2)
                                    .findAll()
                                oldTurtles.deleteAllFromRealm()
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun cascadingDelete() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                realm.createObject(
                                    Turtle::class.java,
                                    ObjectId()
                                )
                                val ali =
                                    realm.createObject(
                                        TurtleEnthusiast::class.java, ObjectId()
                                    )
                                ali.name = "Ali"
                            }
                            // :code-block-start: cascading-deletes
                            realm.executeTransaction { r: Realm ->
                                // Find a turtle enthusiast named "Ali"
                                val ali = r.where(TurtleEnthusiast::class.java)
                                    .equalTo("name", "Ali").findFirst()
                                // Delete all of ali's turtles
                                ali!!.turtles!!.deleteAllFromRealm()
                                ali.deleteFromRealm()
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun deleteAllInstancesOfAType() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r: Realm? ->
                                realm.createObject(
                                    Turtle::class.java,
                                    ObjectId()
                                )
                                val ali =
                                    realm.createObject(
                                        TurtleEnthusiast::class.java, ObjectId()
                                    )
                                ali.name = "Ali"
                            }
                            // :code-block-start: delete-all-instances-of-a-type
                            realm.executeTransaction { r: Realm ->
                                r.delete(Turtle::class.java)
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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
    fun deleteEverything() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            realm.executeTransaction { r ->
                                r.createObject(Turtle::class.java, ObjectId())
                                val ali = r.createObject(
                                    TurtleEnthusiast::class.java, ObjectId()
                                )
                                ali.name = "Ali"
                            }
                            // :code-block-start: delete-all
                            realm.executeTransaction { r: Realm ->
                                r.deleteAll()
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:
                        }
                    })
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