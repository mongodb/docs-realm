package com.mongodb.realm.examples.java;

import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4.class)
public class QuickStartTest {
    @Test
    public void testQuickStart() throws Exception {
        ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class);
        while(scenario.getState() != Lifecycle.State.DESTROYED) {
            // continue running the test until the quick start has completed execution
        }
    }
}