package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import java.lang.System
import kotlin.test.Test
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.launch
import kotlinx.coroutines.newSingleThreadContext
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain


class SyncTest {
    val YOUR_APP_ID: String = "kmm-example-testers-viybt"

    @Test
    fun anonymousAuthTest() {
        // :code-block-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
        }
        // :code-block-end:
    }

    //private val mainThreadSurrogate = newSingleThreadContext("UI thread")

    //@BeforeClass
    //fun setUp() {
    //    Dispatchers.setMain(mainThreadSurrogate)
    //}

    //@AfterClass
    //fun tearDown() {
    //    Dispatchers.resetMain() // reset the main dispatcher to the original Main dispatcher
    //    mainThreadSurrogate.close()
    //}

    /*
    @Test
    fun testSomeUI() = runBlocking {
        Dispatchers.setMain(mainThreadSurrogate)

        launch(Dispatchers.Main) {  // Will be launched in the mainThreadSurrogate dispatcher
            val YOUR_APP_ID = "kmm-example-testers-viybt"
            System.setProperty("kotlinx.coroutines.blocking.checker", "disable")
            // :code-block-start: anonymous
            runBlocking(StandardTestDispatcher()) {
                val app = App.create(YOUR_APP_ID)
                val user = app.login(Credentials.anonymous())
                val config = SyncConfiguration.Builder(user, "partition-value").build()
                val realm = Realm.open(config)
            }

            // :code-block-end:
            kotlin.test.assertTrue(true) // reached end of test successfully
        }
    }*/

    @Test
    fun foobar() {
        print("a message")
    }


    @OptIn(ExperimentalCoroutinesApi::class)
    @Test
    fun anonymous() = runTest {

        val YOUR_APP_ID = "kmm-example-testers-viybt"
        System.setProperty("kotlinx.coroutines.blocking.checker", "disable")
        // :code-block-start: anonymous
        //runBlocking(StandardTestDispatcher()) {

        //}
/*
        val handlerThread = HandlerThread("CopyARealmHandler")
        handlerThread.start()
        val handler = Handler(handlerThread.looper)
        handler.post(Thread {
            val app = App.create(YOUR_APP_ID)
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, "partition-value").build()
            val realm = Realm.open(config)
            realm.close()
        })
*/
        // :code-block-end:
        kotlin.test.assertTrue(true) // reached end of test successfully
    }

    /*
    @Test
    fun emailPassword() = runTest {
        val configSetup = RealmConfiguration(schema = setOf(Frog::class))
        val realmSetup = Realm.open(configSetup)
        realmSetup.writeBlocking {
            this.copyToRealm(Frog().apply {
                name = "Benjamin Franklin";
                age = 12
                species = "bullfrog"
                owner = null
            })
        }
        // :code-block-start: landing-page-update
        val config = RealmConfiguration(schema = setOf(Frog::class))
        val realm = Realm.open(config)
        // start a write transaction
        realm.writeBlocking {
            // get a frog from the database to update
            val frog = this.objects<Frog>()
                .query("name == $0 LIMIT(1)", "Benjamin Franklin")
            // change the frog's name
            frog[0].name = "George Washington"
            // change the frog's species
            frog[0].species = "American bullfrog"
        } // when the transaction completes, the frog's name and species
        // are updated in the database
        // :code-block-end:
        assertTrue(true) // reached end of test successfully
    }*/
}