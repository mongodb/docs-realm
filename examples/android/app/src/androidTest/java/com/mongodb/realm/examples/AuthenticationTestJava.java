package com.mongodb.realm.examples;

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
public class AuthenticationTestJava {
    @Test
    public void testAuthenticationJava() throws Exception {
        ActivityScenario.launch(AuthenticationJava.class);
        Thread.sleep(2000);
    }
}