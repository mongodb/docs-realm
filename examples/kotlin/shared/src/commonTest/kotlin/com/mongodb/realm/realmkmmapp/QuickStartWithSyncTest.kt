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

    @Test
    fun QuickStartWithSyncTest() {
        val YOUR_APP_ID = FLEXIBLE_APP_ID

        // :snippet-start: qs-with-sync-open-a-realm
        val app = App.create(YOUR_APP_ID)
        val NAME_QUERY = "NAME_QUERY"
        runBlocking{
            val user = app.login(Credentials.anonymous())
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
            Log.v("Successfully opened realm: ${realm.configuration.name}")


            realm.writeBlocking {
                copyToRealm(Task().apply {
                    name = "Go to the grocery store"
                    status = "Open"
                })
                copyToRealm(Task().apply {
                    name = "Workout at the gym"
                    status = "In Progress"
                })

                copyToRealm(Task().apply {
                    name = "Read chemistry textbook chapter 4"
                    status = "Open"
                })
            }

            // all tasks in the realm
            val tasks: RealmResults<Task> = realm.query<Task>().find()

            // tasks in the realm whose name begins with the letter 'D'
            val tasksThatBeginWIthD: RealmResults<Task> =
                realm.query<Task>("name BEGINSWITH $0", "D")
                    .find()
            val openTasks: RealmResults<Task> =
                realm.query<Task>("status == $0", "Open")
                    .find()

            // change the first task with open status to in progress status
            realm.writeBlocking {
                findLatest(openTasks[0])?.status = "In Progress"
            }

            // delete the first task in the realm
            realm.writeBlocking {
                val writeTransactionTasks = query<Task>().find()
                delete(writeTransactionTasks.first())
            }

            realm.close()
        }
        // :snippet-end:
    }
}

//public final fun create(configuration: AppConfiguration): App defined in io.realm.kotlin.mongodb.App.Companion
//public final fun create(appId: String): App defined in io.realm.kotlin.mongodb.App.Companion