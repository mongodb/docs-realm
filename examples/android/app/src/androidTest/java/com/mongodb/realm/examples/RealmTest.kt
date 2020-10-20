package com.mongodb.realm.examples

import android.app.Activity
import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.realm.Realm
import org.junit.Before
import org.junit.runner.RunWith
import java.util.concurrent.atomic.AtomicBoolean

@RunWith(AndroidJUnit4::class)
open class RealmTest {
    @JvmField
    public var scenario: ActivityScenario<BasicActivity>? = null
    @JvmField
    public var activity: Activity? = null

    @Before
    fun setUp() {
        val expectation = Expectation()
        scenario = ActivityScenario.launch(BasicActivity::class.java)
        scenario!!.onActivity { activity ->
            Realm.init(activity)
            this.activity = activity
            // ok you go now
            expectation.fulfill()
        }
        // wait
        expectation.await()
    }
}

const val YOUR_APP_ID = "example-testers-kvjdy"

class Expectation {
    private var _done = AtomicBoolean(false)

    fun fulfill() {
        _done.set(true)
    }

    fun await() {
        while (!_done.get());
    }
}