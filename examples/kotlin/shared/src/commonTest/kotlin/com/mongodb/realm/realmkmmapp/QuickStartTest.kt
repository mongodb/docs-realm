package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmResults
import io.realm.delete
import io.realm.notifications.ResultsChange
import io.realm.query
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class QuickStartTest: RealmTest() {

    @Test
    fun queryTest() {
        // :code-block-start: landing-page-query
        val config = RealmConfiguration.Builder()
            .schema(setOf(Frog::class))
            .path(randomTmpRealmPath()) // :hide:
            .build()
        val realm = Realm.open(config)
        val frogsQuery = realm.query<Frog>()
        val numTadpoles = frogsQuery.query("age > $0", 2).count()
        Log.v("Tadpoles: $numTadpoles")
        val numFrogsNamedJasonFunderburker = frogsQuery.query("name == $0", "Jason Funderburker").count()
        Log.v("Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")
        val numFrogsWithoutOwners = frogsQuery.query("owner == null").count()
        Log.v("Frogs without owners: $numFrogsWithoutOwners")
        // :code-block-end:
    }

    @Test
    fun updateTest() {
        val configSetup = RealmConfiguration.Builder()
            .schema(setOf(Frog::class))
            .path(randomTmpRealmPath()) // :hide:
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
        // :code-block-start: landing-page-update
        val config = RealmConfiguration.Builder()
            .schema(setOf(Frog::class))
            .path(randomTmpRealmPath()) // :hide:
            .build()
        val realm = Realm.open(config)
        // start a write transaction
        realm.writeBlocking {
            // get a frog from the database to update
            val frog = query<Frog>()
                .query("name == $0 LIMIT(1)", "Benjamin Franklin").first().find()
            // change the frog's name
            frog?.name = "George Washington"
            // change the frog's species
            frog?.species = "American bullfrog"
        } // when the transaction completes, the frog's name and species
        // are updated in the database
        // :code-block-end:
    }

    @Test
    fun quickStartTest() {
        // :code-block-start: quick-start
        // :code-block-start: quick-start-open-a-realm
        val config = RealmConfiguration.Builder()
            .schema(setOf(Task::class))
            .path(randomTmpRealmPath()) // :hide:
            .build()
        val realm: Realm = Realm.open(config)
        // :code-block-end:
        // :code-block-start: quick-start-create
        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Do work"
                status = "Open"
            })
        }
        // :code-block-end:
        // :code-block-start: quick-start-read
        // all tasks in the realm
        val tasks = realm.query<Task>().find()
        // :code-block-end:
        // :code-block-start: quick-start-read-filtered
        // all tasks in the realm
        val tasksThatBeginWIthD = realm.query<Task>("name BEGINSWITH $0", "D").find()
        val openTasks = realm.query<Task>("status == $0", "Open").find()
        // :code-block-end:
        // :code-block-start: quick-start-update
        realm.writeBlocking {
            findLatest(openTasks[0])?.status = "In Progress"
        }
        // :code-block-end:
        // :code-block-start: quick-start-delete
        realm.writeBlocking {
            findLatest(tasks[0])?.delete()
        }
        // :code-block-end:
        // :code-block-end:
    }

    @Test
    fun changeListenersTest() {
        // :code-block-start: change-listeners
        val config = RealmConfiguration.Builder()
            .schema(setOf(Task::class))
            .path(randomTmpRealmPath()) // :hide:
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
        // :code-block-end:
    }
}