package com.mongodb.realm.examples.kotlin

import androidx.lifecycle.Lifecycle
import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4

import org.junit.Test
import org.junit.runner.RunWith

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class QuickStartTest {
    @Test fun testQuickStart() {
        val scenario : ActivityScenario<MainActivity> = ActivityScenario.launch(MainActivity::class.java)
        while(scenario.state != Lifecycle.State.DESTROYED) {
            // continue running the test until the quick start has completed execution
        }
    }
}