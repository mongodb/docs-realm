package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.notifications.UpdatedResults
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.ObjectId
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.test.Test
import kotlin.test.assertEquals

class QuickStartWithSyncTest : RealmTest() {

    var changeHasBeenObserved: Boolean = false

    @Test
    fun QuickStartWithSyncTest() {
        val YOUR_APP_ID = FLEXIBLE_APP_ID

        // :snippet-start: qs-sync-complete-example
        // :snippet-start: qs-sync-initialize-app
        val app = App.create(YOUR_APP_ID)
        // :snippet-end:
        runBlocking {
            // :snippet-start: qs-with-sync-authenticate
            val credentials = Credentials.anonymous()
            val user = app.login(credentials)
            // :snippet-end:

            // :snippet-start: qs-sync-define-your-data-model
            class Task : RealmObject {
                @PrimaryKey
                var _id: ObjectId = ObjectId.create()
                var name: String = ""
                var status: String = "Open"
                var priority: Int = 1
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-open-a-realm
            val config = SyncConfiguration.Builder(user, setOf(Task::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Task>(
                            "priority > 3",
                            "Open"
                        ),
                        "High Priority Tasks"
                    )
                }
                .build()
            val realm = Realm.open(config)
            // :snippet-end:

            // :remove-start:
            realm.write {
                delete(
                    this.query<Task>().find()
                ) // delete all QuickStartWithSync.Tasks before any writes to keep this test idempotent
            }
            // :remove-end:

            // :snippet-start: qs-with-sync-find-all-task
            // all tasks in the realm
            val tasks: RealmResults<Task> = realm.query<Task>().find()
            // :snippet-end:

            // :snippet-start: qs-with-sync-watch-for-changes
            // flow.collect() is blocking -- run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                // create a Flow from the Task collection, then add a listener to the Flow
                val tasksFlow = tasks.asFlow()
                tasksFlow.collect { changes: ResultsChange<Task> ->
                    when (changes) {
                        // UpdatedResults means this change represents an update/insert/delete operation
                        is UpdatedResults -> {
                            // :remove-start:
                            changeHasBeenObserved = true
                            // :remove-end:
                            changes.insertions // indexes of inserted objects
                            changes.insertionRanges // ranges of inserted objects
                            changes.changes // indexes of modified objects
                            changes.changeRanges // ranges of modified objects
                            changes.deletions // indexes of deleted objects
                            changes.deletionRanges // ranges of deleted objects
                            changes.list // the full collection of objects
                        }
                        else -> {
                            // types other than UpdatedResults are not changes -- ignore them
                        }
                    }
                }
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-create-a-task
            // create a new task object
            realm.writeBlocking {
                copyToRealm(Task().apply {
                    name = "Go Jogging"
                    status = "Open"
                    priority = 2
                })
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-batch-writes
            // you can also create multiple realm objects within a single write block
            realm.writeBlocking {
                copyToRealm(Task().apply {
                    name = "Go grocery shopping"
                    status = "Open"
                    priority = 5
                })
                copyToRealm(Task().apply {
                    name = "Exercise at the gym"
                    status = "In Progress"
                    priority = 2
                })
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-filter-tasks
            // tasks in the realm whose name begins with the letter 'G'
            val tasksThatBeginWIthG: RealmResults<Task> =
                realm.query<Task>("name BEGINSWITH $0", "G")
                    .find()
            // tasks in the realm whose status is 'Open'
            val openTasks: RealmResults<Task> =
                realm.query<Task>("status == $0", "Open") // Go Jogging,
                    .find()
            // :snippet-end:

            // :snippet-start: qs-with-sync-modify-task
            // change the first task to in progress status
            realm.writeBlocking {
                findLatest(openTasks[0])?.status = "In Progress"
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-delete-task
            // delete the first task object in the realm
            realm.writeBlocking {
                val writeTransactionTasks = query<Task>().find()
                delete(writeTransactionTasks.first())
            }
            // :snippet-end:

            // :remove-start:
            assertEquals(
                2,
                realm.query<Task>().find().count()
            ) // only 2 tasks since the first task object has been deleted
            assertEquals(true, changeHasBeenObserved)
            // :remove-end:

            // :snippet-start: qs-with-sync-unsubscribe-to-changes.kt
            job.cancel() // cancel the coroutine containing the listener
            // :snippet-end:

            // :snippet-start: qs-with-sync-close-realm
            realm.close()
            // :snippet-end:
        }
        // :snippet-end:
    }
}
