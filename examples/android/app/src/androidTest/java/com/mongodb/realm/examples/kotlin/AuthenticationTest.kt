package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.junit.Assert

import org.junit.Test

class AuthenticationTest : RealmTest() {
    @Test fun testAnonymous() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: anonymous
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            var user: User?
            app.loginAsync(anonymousCredentials) {
                // :hide-start:
                Assert.assertEquals(true, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated anonymously.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testEmailPassword() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: email-password
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val emailPasswordCredentials: Credentials = Credentials.emailPassword("<email>", "<password>")

            var user: User? = null
            app.loginAsync(emailPasswordCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testAPIKey() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: api-key
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val apiKeyCredentials: Credentials = Credentials.apiKey("<key>")

            var user: User? = null
            app.loginAsync(apiKeyCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testCustomFunction() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: custom-function
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val customFunctionCredentials:
                    Credentials = Credentials.customFunction(org.bson.Document("username","bob"))

            var user: User? = null
            app.loginAsync(customFunctionCredentials) {
                // :hide-start:
                Assert.assertEquals(true, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testCustomJWT() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: custom-jwt
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch JWT from custom provider

            val customJWTCredentials: Credentials = Credentials.jwt("<token>")

            var user: User? = null
            app.loginAsync(customJWTCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testFacebookOAuth() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: facebook
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch access token using Facebook SDK

            val facebookCredentials: Credentials = Credentials.facebook("<token>")

            var user: User? = null
            app.loginAsync(facebookCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using Facebook OAuth.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testGoogleOAuth() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: google
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(AppConfiguration.Builder(appID)
                .build())

            // fetch authentication code using Google SDK

            val googleCredentials: Credentials = Credentials.google("<token>")

            var user: User? = null
            app.loginAsync(googleCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using Google OAuth.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testSignInWithApple() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :code-block-start: apple
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(AppConfiguration.Builder(appID)
                .build())

            // fetch IDToken using Apple SDK

            val appleCredentials: Credentials = Credentials.apple("<token>")

            var user: User? = null
            app.loginAsync(appleCredentials) {
                // :hide-start:
                Assert.assertEquals(false, it.isSuccess)
                // :hide-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test fun testLogOut() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            var user: User? = null
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated anonymously.")
                    user = app.currentUser()
                    // :code-block-start: log-out
                    user?.logOutAsync {
                        // :hide-start:
                        Assert.assertEquals(true, it.isSuccess)
                        // :hide-end:
                        if (it.isSuccess) {
                            Log.v("AUTH", "Successfully logged out.")
                        } else {
                            Log.e("AUTH", it.error.toString())
                        }
                        // :hide-start:
                        expectation.fulfill()
                        // :hide-end:
                    }
                    // :code-block-end:
                } else {
                    Log.e("AUTH", it.error.toString())
                }

            }
        }
        expectation.await()
    }
}