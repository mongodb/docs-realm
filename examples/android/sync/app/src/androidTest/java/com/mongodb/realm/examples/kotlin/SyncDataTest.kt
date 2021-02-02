package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.Task
import com.mongodb.realm.examples.model.TaskStatus
import io.realm.Realm
import io.realm.log.LogLevel
import io.realm.log.RealmLog
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.mongo.result.InsertOneResult
import io.realm.mongodb.sync.ConnectionState
import io.realm.mongodb.sync.ProgressMode
import io.realm.mongodb.sync.SyncConfiguration
import io.realm.mongodb.sync.SyncSession
import org.bson.BsonDocument
import org.bson.BsonObjectId
import org.bson.BsonString
import org.bson.types.ObjectId
import org.junit.Assert
import org.junit.Test


class SyncDataTest : RealmTest() {
    @Test
    fun openASyncedRealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :code-block-start: open-a-synced-realm
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // read and write to realm here via transactions
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                        }
                    })
                    // :code-block-end:
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
    fun syncData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :code-block-start: sync-data
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            val tasks = realm.where(Task::class.java).findAll()
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction { r: Realm ->
                                r.insert(Task())
                                // :hide-start:
                                expectation.fulfill()
                                // :hide-end:
                            }
                            // Don't forget to close your realm!
                            realm.close()
                        }
                    })
                    // :code-block-end:
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
    fun pauseOrResumeSyncSession() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            val tasks =
                                realm.where(
                                    Task::class.java
                                ).findAll()
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction { r: Realm ->
                                r.insert(
                                    Task()
                                )
                            }
                            // :code-block-start: pause-sync-session
                            val session: SyncSession = app.sync.getSession(config)
                            session.stop()
                            // :code-block-end:
                            Assert.assertEquals(
                                ConnectionState.DISCONNECTED,
                                app.sync.getSession(config).state
                            )
                            // :code-block-start: resume-sync-session
                            val syncSession: SyncSession = app.sync.getSession(config)
                            syncSession.start()
                            // :code-block-end:
                            realm.executeTransaction { r: Realm ->
                                r.insert(
                                    Task()
                                )
                            }
                            expectation.fulfill()
                            realm.close()
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
    fun checkCurrentNetworkConnection() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            val tasks = realm.where(Task::class.java).findAll()
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction { r ->
                                r.insert(
                                    Task()
                                )
                            }

                            // :code-block-start: check-current-network-connection
                            Log.v("EXAMPLE", "Sync state: ${app.sync.getSession(config).connectionState}")
                            // :code-block-end:
                            expectation.fulfill()
                            realm.close()
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
    fun checkUploadAndDownloadProgress() {
        val tracksUploadProgress = Expectation()
        val tracksDownloadProgress = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            val tasks = realm.where(Task::class.java).findAll()
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction { r: Realm ->
                                r.insert(
                                    Task()
                                )
                            }

                            // :code-block-start: check-upload-progress
                            app.sync.getSession(config).addUploadProgressListener(
                                ProgressMode.INDEFINITELY) { progress ->
                                Log.v("EXAMPLE", "Upload progress: ${progress.fractionTransferred}")
                                // :hide-start:
                                tracksUploadProgress.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:

                            // :code-block-start: check-download-progress
                            app.sync.getSession(config).addDownloadProgressListener(
                                ProgressMode.INDEFINITELY) { progress ->
                                Log.v("EXAMPLE", "Download progress: ${progress.fractionTransferred}")
                                // :hide-start:
                                tracksDownloadProgress.fulfill()
                                // :hide-end:
                            }
                            // :code-block-end:

                            // write a task locally to initiate an upload
                            realm.executeTransaction { r: Realm ->
                                r.insert(
                                    Task()
                                )
                            }

                            // write a task to a synced collection to initiate a download
                            val mongoClient =
                                user!!.getMongoClient("mongodb-atlas") // service for MongoDB Atlas cluster containing custom user data
                            val mongoDatabase = mongoClient.getDatabase("android")
                            val mongoCollection =
                                mongoDatabase.getCollection("Task").withDocumentClass(
                                    BsonDocument::class.java
                                )
                            Log.v(
                                "EXAMPLE",
                                "Successfully instantiated the MongoDB collection handle"
                            )
                            val task =
                                BsonDocument().append("name", BsonString("task name"))
                                    .append("_partition", BsonString(partition))
                                    .append(
                                        "status",
                                        BsonString(TaskStatus.Open.name)
                                    )
                                    .append("_id", BsonObjectId(ObjectId()))
                            mongoCollection.insertOne(task)
                                .getAsync {
                                    if (it.isSuccess) {
                                        Log.v(
                                            "EXAMPLE",
                                            "successfully inserted a document with id: " + it.get()
                                                .insertedId
                                        )
                                    } else {
                                        Log.e(
                                            "EXAMPLE",
                                            "failed to insert documents with: " + it.error
                                                .errorMessage
                                        )
                                    }
                                }
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
        tracksUploadProgress.await()
        tracksDownloadProgress.await()
    }


    @Test
    fun setClientLogLevel() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            // :code-block-start: set-client-log-level
            RealmLog.setLevel(LogLevel.ALL)
            // :code-block-end:
            expectation.fulfill()
        }
        expectation.await()
    }
}
