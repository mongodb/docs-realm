package com.mongodb.realm.quickstart

import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import io.realm.annotations.Required
import org.bson.types.ObjectId

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import io.realm.OrderedRealmCollectionChangeListener

import io.realm.Realm
import io.realm.RealmResults
import io.realm.kotlin.where
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration

import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Realm.init(this) // context, usually an Activity or Application
        val appID = "<your app ID>" // replace this with your App ID
        val app: App = App(AppConfiguration.Builder(appID)
            .build())

        val credentials: Credentials = Credentials.anonymous()

        app.loginAsync(credentials) {
            if (it.isSuccess) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.")
                val user: User? = app.currentUser()

                val partitionValue: String = "My Project"

                val config = SyncConfiguration.Builder(user!!, partitionValue)
                                .build()

                val realm: Realm = Realm.getInstance(config)

                val task : Task = Task("New Task", partitionValue)
                realm.executeTransaction { transactionRealm ->
                    transactionRealm.insert(task)
                }

                // all tasks in the realm
                val tasks : RealmResults<Task> = realm.where<Task>().findAll()

                // you can also filter a collection
                val tasksThatBeginWithN : List<Task> = tasks.where().beginsWith("name", "N").findAll()
                val openTasks : List<Task> = tasks.where().equalTo("status", TaskStatus.Open.name).findAll()

                val otherTask: Task = tasks[0]!!

                tasks.addChangeListener(OrderedRealmCollectionChangeListener<RealmResults<Task>> { collection, changeSet ->
                    // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
                    val deletions = changeSet.deletionRanges
                    for (i in deletions.indices.reversed()) {
                        val range = deletions[i]
                        Log.v("QUICKSTART", "Deleted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
                    }

                    val insertions = changeSet.insertionRanges
                    for (range in insertions) {
                        Log.v("QUICKSTART", "Inserted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
                    }

                    val modifications = changeSet.changeRanges
                    for (range in modifications) {
                        Log.v("QUICKSTART", "Updated range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
                    }
                })

                // all modifications to a realm must happen inside of a write block
                realm.executeTransaction { transactionRealm ->
                    val innerOtherTask : Task = transactionRealm.where<Task>().equalTo("_id", otherTask._id).findFirst()!!
                    innerOtherTask.status = TaskStatus.Complete.name
                }

                val yetAnotherTask: Task = tasks.get(0)!!
                val yetAnotherTaskId: ObjectId = yetAnotherTask._id
                // all modifications to a realm must happen inside of a write block
                realm.executeTransactionAsync { transactionRealm ->
                    val innerYetAnotherTask : Task = transactionRealm.where<Task>().equalTo("_id", yetAnotherTaskId).findFirst()!!
                    innerYetAnotherTask.deleteFromRealm()
                }

                user.logOutAsync {
                    if (it.isSuccess) {
                        Log.v("QUICKSTART", "Successfully logged out.")
                    } else {
                        Log.e("QUICKSTART", "Failed to log out. Error: ${it.error}")
                    }
                }
            } else {
                Log.e("QUICKSTART", "Failed to log in. Error: ${it.error}")
            }
        }

    }
}

enum class TaskStatus(val displayName: String) {
    Open("Open"),
    InProgress("In Progress"),
    Complete("Complete"),
}

open class Task(_name: String = "Task", project: String = "My Project") : RealmObject() {
    @PrimaryKey var _id: ObjectId = ObjectId()
    var _partition: String = project
    var name: String = _name

    @Required
    var status: String = TaskStatus.Open.name
    var statusEnum: TaskStatus
        get() {
            // because status is actually a String and another client could assign an invalid value,
            // default the status to "Open" if the status is unreadable
            return try {
                TaskStatus.valueOf(status)
            } catch (e: IllegalArgumentException) {
                TaskStatus.Open
            }
        }
        set(value) { status = value.name }
}