package com.mongodb.realm.realmkmmapp

import android.app.Activity
import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import androidx.test.core.app.ActivityScenario
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.test.assertTrue
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import org.junit.Test

class AndroidTest {
    @Test
    fun anonymous() {

        val YOUR_APP_ID = "kmm-example-testers-viybt"

        var testActivity: MainActivity? = null
        val scenario: ActivityScenario<MainActivity>? =
            ActivityScenario.launch(MainActivity::class.java)
        // create a latch to force blocking for an async call to initialize realm
        val setupLatch = CountDownLatch(1)
        scenario?.onActivity{ activity: MainActivity ->
            testActivity = activity
            setupLatch.countDown() // unblock the latch await
        }
        // block until we have an activity to run tests on
        try {
            assertTrue(setupLatch.await(1, TimeUnit.SECONDS))
        } catch (e: InterruptedException) {
            Log.e("EXAMPLE", e.stackTraceToString())
        }
        val testLatch = CountDownLatch(1)
        testActivity?.runOnUiThread {
            runBlocking() {
                val app = App.create(YOUR_APP_ID)
                val user = app.login(Credentials.anonymous())
                val config = SyncConfiguration.Builder(user, "partition-value").build()
                val realm = Realm.open(config)
                realm.close()
            }
        }

        val handlerThread = HandlerThread("CopyARealmHandler")
        handlerThread.start()
        val handler = Handler(handlerThread.looper)
        handler.post(Thread {

        })

        // :code-block-end:
        assertTrue(true) // reached end of test successfully
    }
}