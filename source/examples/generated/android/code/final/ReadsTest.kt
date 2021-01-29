package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.Project
import com.mongodb.realm.examples.model.ProjectTask
import io.realm.Realm
import io.realm.Sort
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId
import org.junit.Test


class ReadsTest : RealmTest() {

    @Test
    fun getAllObjects() {
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
                            val tasksQuery = realm.where(ProjectTask::class.java)
                            val projectsQuery = realm.where(Project::class.java)
                            expectation.fulfill()
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
    fun findAnObjectByPrimaryKey() {
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
                            val PRIMARY_KEY_VALUE =
                                ObjectId()
                            realm.executeTransaction { r: Realm ->
                                r.createObject(
                                    ProjectTask::class.java,
                                    PRIMARY_KEY_VALUE
                                )
                            }
                            val task = realm.where(ProjectTask::class.java)
                                .equalTo("_id", ObjectId.get()).findFirst()
                            Log.v("EXAMPLE", "Fetched object by primary key: $task")
                            expectation.fulfill()
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
    fun filterResults() {
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
                            val PRIMARY_KEY_VALUE =
                                ObjectId()
                            realm.executeTransaction { r: Realm ->
                                r.createObject(
                                    ProjectTask::class.java,
                                    PRIMARY_KEY_VALUE
                                )
                            }
                            val tasksQuery = realm.where(ProjectTask::class.java)
                            Log.i(
                                "EXAMPLE", "High priority tasks: " + tasksQuery.greaterThan(
                                    "priority",
                                    5
                                ).count()
                            )
                            Log.i(
                                "EXAMPLE", "Just-started or short tasks: " + tasksQuery.between(
                                    "progressMinutes",
                                    1,
                                    10
                                ).count()
                            )
                            Log.i(
                                "EXAMPLE",
                                "Unassigned tasks: " + tasksQuery.isNull("assignee").count()
                            )
                            Log.i(
                                "EXAMPLE", "Ali or Jamie's tasks: " + tasksQuery.`in`(
                                    "assignee", arrayOf(
                                        "Ali",
                                        "Jamie"
                                    )
                                ).count()
                            )
                            expectation.fulfill()
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
    fun sortResults() {
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
                            val PRIMARY_KEY_VALUE =
                                ObjectId()
                            realm.executeTransaction { r: Realm ->
                                r.createObject(
                                    ProjectTask::class.java,
                                    PRIMARY_KEY_VALUE
                                )
                            }
                            val projectsQuery = realm.where(Project::class.java)
                            val results = projectsQuery.sort("name", Sort.DESCENDING).findAll()
                            expectation.fulfill()
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
