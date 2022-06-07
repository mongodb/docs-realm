package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.query.RealmQuery
import io.realm.kotlin.ext.query
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.query.RealmResults
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class QuickStartTest: RealmTest() {

    @Test
    fun queryTest() {
        // :snippet-start: landing-page-query
        val config = RealmConfiguration.Builder(schema = setOf(Frog::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realm = Realm.open(config)
        val tadpoles: RealmQuery<Frog> = realm.query<Frog>("age > $0", 2)
        Log.v("Tadpoles: ${tadpoles.count()}")
        val numTadpolesNamedJasonFunderburker = tadpoles.query("name == $0", "Jason Funderburker").count()
        Log.v("Tadpoles named Jason Funderburker: $numTadpolesNamedJasonFunderburker")
        // :snippet-end:
    }

    @Test
    fun updateTest() {
        val configSetup = RealmConfiguration.Builder(schema = setOf(Frog::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realmSetup = Realm.open(configSetup)
        realmSetup.writeBlocking {
            copyToRealm(Frog().apply {
                name = "Benjamin Franklin"
                age = 12
                species = "bullfrog"
                owner = null
            })
        }
        // :snippet-start: landing-page-update
        val config = RealmConfiguration.Builder(schema = setOf(Frog::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realm = Realm.open(config)
        // start a write transaction
        realm.writeBlocking {
            // get a frog from the database to update
            val frog: Frog? = query<Frog>()
                .query("name == $0 LIMIT(1)",
                    "Benjamin Franklin")
                .first()
                .find()
            // update the frog's properties
            frog?.apply {
                name = "George Washington"
                species = "American bullfrog"
            }
        } // when the transaction completes, the frog's name and species
        // are updated in the database
        // :snippet-end:
    }

    @Test
    fun quickStartTest() {
        // :snippet-start: quick-start
        // :snippet-start: quick-start-open-a-realm
        val config = RealmConfiguration.Builder(schema = setOf(Task::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realm: Realm = Realm.open(config)
        // :remove-start:
        // insert some sample data
        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Do work 1"
                status = "In Progress"
            })
        }
        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Do work 2"
                status = "Open"
            })
        }
        // :remove-end:
        // :snippet-end:
        // :snippet-start: quick-start-create
        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Do work"
                status = "Open"
            })
        }
        // :snippet-end:
        // :snippet-start: quick-start-read
        // all tasks in the realm
        val tasks: RealmResults<Task> = realm.query<Task>().find()
        // :snippet-end:
        // :snippet-start: quick-start-read-filtered
        // tasks in the realm whose name begins with the letter 'D'
        val tasksThatBeginWIthD: RealmResults<Task> =
            realm.query<Task>("name BEGINSWITH $0", "D")
                .find()
        val openTasks: RealmResults<Task> =
            realm.query<Task>("status == $0", "Open")
                .find()
        // :snippet-end:
        // :snippet-start: quick-start-update
        // change the first task with open status to in progress status
        realm.writeBlocking {
            findLatest(openTasks[0])?.status = "In Progress"
        }
        // :snippet-end:
        // :snippet-start: quick-start-delete
        // delete the first task in the realm
        realm.writeBlocking {
            val writeTransactionTasks = query<Task>().find()
            delete(writeTransactionTasks.first())
        }
        // :snippet-end:
        // :snippet-end:
    }

    @Test
    fun changeListenersTest() {
        // :snippet-start: change-listeners
        val config = RealmConfiguration.Builder(schema = setOf(Task::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realm = Realm.open(config)

        // fetch objects from a realm as Flowables
        CoroutineScope(Dispatchers.Main).launch {
            val flow: Flow<ResultsChange<Task>> = realm.query<Task>().asFlow()
            flow.collect { task ->
                Log.v("Task: $task")
            }
        }

        // write an object to the realm in a coroutine
        CoroutineScope(Dispatchers.Main).launch {
            realm.write {
                copyToRealm(Task().apply { name = "my task"; status = "Open"})
            }
        }
        // :snippet-end:
    }
}