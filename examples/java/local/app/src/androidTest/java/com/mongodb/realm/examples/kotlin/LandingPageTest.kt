package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.ObjectChangeSet
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmObjectChangeListener
import org.junit.Assert
import org.junit.Test

class LandingPageTest : RealmTest() {
    @Test
    fun testQuery() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: query
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            val frogsQuery = realm.where(Frog::class.java)

            val numTadpoles =
                frogsQuery.lessThan("age", 2).count()
            Log.i("EXAMPLE",
                "Tadpoles: $numTadpoles")

            val numFrogsNamedJasonFunderburker =
                frogsQuery.equalTo("name", "Jason Funderburker").count()
            Log.i("EXAMPLE",
                "Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")

            val numFrogsWithoutOwners =
                frogsQuery.isNull("owner").count()
            Log.i("EXAMPLE",
                "Frogs without owners: $numFrogsWithoutOwners")
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testUpdate() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: update
            val config =
                RealmConfiguration.Builder()
                    // :hide-start:
                    .allowQueriesOnUiThread(true) // only need these for the behind-the-scenes insert, so hide them
                    .allowWritesOnUiThread(true)
                    // :hide-end:
                    .build()
            val realm = Realm.getInstance(config)

            // :hide-start:
            realm.executeTransaction { transactionRealm: Realm -> // create a frog to update in the example
                val frog = transactionRealm.createObject(Frog::class.java)
                frog.name = "Benjamin Franklin"
            }
            // :hide-end:
            // start a write transaction
            realm.executeTransactionAsync { transactionRealm: Realm ->
                // get a frog from the database to update
                val frog = transactionRealm.where(Frog::class.java)
                    .equalTo("name", "Benjamin Franklin").findFirst()
                // change the frog's name
                frog?.name = "George Washington"
                // change the frog's species
                frog?.species = "American bullfrog"
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            } // when the transaction completes, the frog's name and species
            // are updated in the database
            // :code-block-end:
        }
        expectation.await()
    }

    @Test
    fun testNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: notifications
            // configure and open a local realm
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)

            // create an reference to a frog
            var frog : Frog? = null

            // insert a new frog into the database and store it in our reference
            realm.executeTransaction { transactionRealm: Realm ->
                frog = transactionRealm.createObject(Frog::class.java)
                frog?.name = "Doctor Cucumber"
                frog?.age = 3
                frog?.species = "Tree Frog"
                frog?.owner = "Greg"
            }

            // create a listener that logs new changes to the frog
            val listener = RealmObjectChangeListener { changedFrog: Frog?,
                                                       changeSet: ObjectChangeSet? ->
                if (changeSet!!.isDeleted) {
                    Log.i("EXAMPLE", "The frog was deleted")
                } else {
                    for (fieldName in changeSet.changedFields) {
                        Log.i("EXAMPLE", "Field '$fieldName' changed.")
                        // :hide-start:
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
            }

            // attach the listener we just created to the frog
            frog?.addChangeListener(listener)

            // update the frog
            realm.executeTransaction { frog?.name = "Ronald" }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test
    fun testLiveObjects() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: live-objects
            // configure and open a local realm
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realmA = Realm.getInstance(config)
            val realmB = Realm.getInstance(config)

            // :hide-start:
            realmA.executeTransaction { transactionRealm: Realm -> // create a frog to work with in the example
                val frog = transactionRealm.createObject(
                    Frog::class.java
                )
                frog.name = "Mr. President"
            }
            // :hide-end:

            // get a reference to a single frog object
            // stored in the database from each realm instance
            val frogA = realmA.where(Frog::class.java)
                .equalTo("name", "Mr. President")
                .findFirst()
            val frogB = realmB.where(Frog::class.java)
                .equalTo("name", "Mr. President")
                .findFirst()

            // update frog A's name
            realmA.executeTransaction { frogA?.name = "Skipper" }
            // frog B instance automatically updates with the new name
            Assert.assertEquals(frogA?.name, frogB?.name)

            // update frog B's age
            realmB.executeTransaction { frogB?.age = 10 }
            // frog A instance automatically updates with the new age
            Assert.assertEquals(frogB?.age, frogA?.age)
            // :code-block-end:
            expectation.fulfill()
        }
        expectation.await()
    }
}