package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.query.RealmQuery
import io.realm.kotlin.ext.query
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.notifications.UpdatedResults
import io.realm.kotlin.query.RealmResults
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

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

        // :snippet-start: quick-start-initialize-app
        val app = App.create(YOUR_APP_ID)
        // :snippet-end:

        runBlocking {
            // :snippet-start: quick-start-authenticate
            val credentials = Credentials.anonymous()
            val user = app.login(credentials)
            // :snippet-end:


            // :snippet-start: quick-start-open-a-synced-realm
            // create a SyncConfiguration
            // :uncomment-start:
            // val config = SyncConfiguration.Builder(
            //     user,
            //     setOf(Item::class)
            // ) // the SyncConfiguration defaults to Flexible Sync, if a Partition is not specified
            //     .initialSubscriptions { realm ->
            //         add(
            //             realm.query<Item>(
            //                 "owner_id == $0", // owner_id == the logged in user
            //                 user.id
            //             ),
            //             "User's Items"
            //         )
            //     }
            //     .build()
            // val realm = Realm.open(config)
            // :uncomment-end:
            // :snippet-end:
        }


        // :snippet-start: quick-start-open-a-local-realm
        val config = RealmConfiguration.Builder(schema = setOf(Item::class))
            // :remove-start:
            .directory("/tmp/")
            .name(getRandom())
            // :remove-end:
            .build()
        val realm: Realm = Realm.open(config)
        // :remove-start:
        // insert some sample data
        realm.writeBlocking {
            copyToRealm(Item().apply {
                summary = "Do work 1"
            })
        }
        realm.writeBlocking {
            copyToRealm(Item().apply {
                summary = "Do work 2"
            })
        }
        // :remove-end:
        // :snippet-end:

        // :snippet-start: quick-start-read
        // all items in the realm
        val items: RealmResults<Item> = realm.query<Item>().find()
        // :snippet-end:


        // :snippet-start: quick-start-watch-for-changes
        // flow.collect() is blocking -- run it in a background context
        val job = CoroutineScope(Dispatchers.Default).launch {
            // create a Flow from the Item collection, then add a listener to the Flow
            val itemsFlow = items.asFlow()
            itemsFlow.collect { changes: ResultsChange<Item> ->
                when (changes) {
                    // UpdatedResults means this change represents an update/insert/delete operation
                    is UpdatedResults -> {
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

        // :snippet-start: quick-start-create
        realm.writeBlocking {
            copyToRealm(Item().apply {
                summary = "Do the laundry"
                isComplete = false
            })
        }
        // :snippet-end:

        // :snippet-start: quick-start-read-filtered
        // items in the realm whose name begins with the letter 'D'
        val itemsThatBeginWIthD: RealmResults<Item> =
            realm.query<Item>("summary BEGINSWITH $0", "D")
                .find()
        //  todo items that have not been completed yet
        val incompleteItems: RealmResults<Item> =
            realm.query<Item>("isComplete == false")
                .find()
        // :snippet-end:
        // :snippet-start: quick-start-update
        // change the first item with open status to complete to show that the todo item has been done
        realm.writeBlocking {
            findLatest(incompleteItems[0])?.isComplete = true
        }
        // :snippet-end:
        // :snippet-start: quick-start-delete
        // delete the first item in the realm
        realm.writeBlocking {
            val writeTransactionItems = query<Item>().find()
            delete(writeTransactionItems.first())
        }
        // :snippet-end:
        // :snippet-end:

        // :snippet-start: quick-start-unsubscribe-to-changes
        job.cancel() // cancel the coroutine containing the listener
        // :snippet-end:

        // :snippet-start: quick-start-close-realm
        realm.close()
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