package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.functions.Functions
import org.junit.Assert
import org.junit.Test

class FunctionTest : RealmTest() {
    @Test
    fun testCallAFunction() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: call-a-function
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(AppConfiguration.Builder(appID).build())

            val anonymousCredentials: Credentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    val user: User? = app.currentUser()

                    val functionsManager: Functions = app.getFunctions(user)
                    val args: List<Int> = listOf(1, 2)
                    functionsManager.callFunctionAsync("sum", args, Integer::class.java) { result ->
                        if (result.isSuccess) {
                            // :hide-start:
                            Assert.assertEquals(true, it.isSuccess)
                            // :hide-end:
                            Log.v("EXAMPLE", "Sum value: ${result.get()}")
                        } else {
                            Log.e("EXAMPLE", "failed to call sum function with: " + result.error)
                        }
                        // :hide-start:
                        expectation.fulfill()
                        // :hide-end:
                    }
                } else {
                    Log.e("EXAMPLE", "Error logging into the Realm app. Make sure that anonymous authentication is enabled. Error: " + it.error)
                }
            }
            // :code-block-end:
        }
        expectation.await()
    }
}