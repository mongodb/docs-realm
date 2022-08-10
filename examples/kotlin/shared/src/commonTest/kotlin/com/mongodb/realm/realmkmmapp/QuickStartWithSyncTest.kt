package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.ObjectId
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.Duration

class QuickStartWithSyncTest: RealmTest() {

    // :snippet-start: qs-sync-define-your-data-model
    class Task: RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId.create()
        var name: String = ""
        var status: String = "Open"
    }
    // :snippet-end:


    @Test
    fun QuickStartWithSyncTest() {
        val YOUR_APP_ID = FLEXIBLE_APP_ID

        // :snippet-start: qs-sync
        // :snippet-start: qs-sync-initialize-app
        val app = App.create(YOUR_APP_ID)
        // :snippet-end:
        runBlocking{
            // :snippet-start: qs-with-sync-authenticate
            val credentials = Credentials.anonymous()
            val user = app.login(credentials)
            // :snippet-end:

            // :snippet-start: qs-with-sync-open-a-realm
            val config = SyncConfiguration.Builder(user, setOf(Task::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Task>(
                            "status == $0",
                            "Open"
                        ),
                        "Open Tasks"
                    )
                }
                .build()
            val realm = Realm.open(config)
            // :snippet-end:

            // :remove-start:
            realm.write {
                delete(this.query<Task>().find()) // delete all QuickStartWithSync.Tasks before any writes to keep this test idempotent
            }
            // :remove-end:

            // :snippet-start: qs-with-sync-create-a-task
                realm.writeBlocking {
                    copyToRealm(Task().apply {
                        name = "Go Jogging"
                        status = "Open"
                    })
                }
            // :snippet-end:

            // :snippet-start: qs-with-sync-batch-writes
            realm.writeBlocking {
                copyToRealm(Task().apply {
                    name = "go grocery shopping"
                    status = "Open"
                })
                copyToRealm(Task().apply {
                    name = "Exercise at the gym"
                    status = "In Progress"
                })
            }
            // :snippet-end:

            // :snippet-start: qs-with-sync-find-all-task
            // all tasks in the realm
            val tasks: RealmResults<Task> = realm.query<Task>().find()
            // :snippet-end:

            // :remove-start:
            println("Continue -----")
            for (task in tasks){
                println(task.name)
            }
            println("Continued 2 -----")
            // :remove-end:

            // :snippet-start: qs-with-sync-filter-tasks
            // tasks in the realm whose name begins with the letter 'D'
            val tasksThatBeginWIthD: RealmResults<Task> =
                realm.query<Task>("name BEGINSWITH $0", "D")
                    .find()
            val openTasks: RealmResults<Task> =
                realm.query<Task>("status == $0", "Open")
                    .find()
            // :snippet-end:

            // :snippet-start: qs-with-sync-modify-task
            // change the first task with open status to in progress status
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

            realm.close()
        }
        // :snippet-end:
    }
}
