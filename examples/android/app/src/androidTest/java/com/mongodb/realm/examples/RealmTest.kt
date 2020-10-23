package com.mongodb.realm.examples

import android.app.Activity
import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.User
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicBoolean

abstract class RealmTest {
    @JvmField
    var scenario: ActivityScenario<BasicActivity>? = null
    @JvmField
    var activity: Activity? = null

    @Before
    fun setUp() {
        val expectation = Expectation()
        scenario = ActivityScenario.launch(BasicActivity::class.java)
        scenario!!.onActivity { activity ->
            Realm.init(activity)
            this.activity = activity
            expectation.fulfill()
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .appName("My App")
                    .requestTimeout(30, TimeUnit.SECONDS)
                    .build())
            val user: User? = app.currentUser()
            user?.logOutAsync {

            }
        }
        // ensure that setup has initialized realm before exiting
        expectation.await()
    }

    @After
    fun tearDown() {
        scenario!!.onActivity { activity ->
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                .appName("My App")
                .requestTimeout(30, TimeUnit.SECONDS)
                .build())
            val user: User? = app.currentUser()
            user?.logOutAsync {

            }
        }
    }
}

const val YOUR_APP_ID = "example-testers-kvjdy"
const val PARTITION = "Example"

class Expectation {
    private var _done = AtomicBoolean(false)

    fun fulfill() {
        _done.set(true)
    }

    fun await() {
        while (!_done.get());
    }
}