package com.mongodb.realm.examples.kotlin

import android.util.Log
import androidx.test.core.app.ActivityScenario
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.FacebookSdk
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
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
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            var user: User?
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated anonymously.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test fun testEmailPassword() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val emailPasswordCredentials: Credentials = Credentials.emailPassword(
                "<email>",
                "<password>"
            )

            var user: User? = null
            app.loginAsync(emailPasswordCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test fun testAPIKey() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val apiKeyCredentials: Credentials = Credentials.apiKey("<key>")

            var user: User? = null
            app.loginAsync(apiKeyCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
            }
        }
        expectation.await()
    }

    @Test fun testCustomFunction() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val customFunctionCredentials:
                    Credentials = Credentials.customFunction(org.bson.Document("username", "bob"))

            var user: User? = null
            app.loginAsync(customFunctionCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
            }
        }
        expectation.await()
    }

    @Test fun testCustomJWT() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch JWT from custom provider

            val customJWTCredentials: Credentials = Credentials.jwt("<token>")

            var user: User? = null
            app.loginAsync(customJWTCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
            }
        }
        expectation.await()
    }

    @Test fun testFacebookOAuth() {
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
             FacebookSdk.setApplicationId("YOUR FACEBOOK SDK APP ID")
            FacebookSdk.sdkInitialize(activity)
            val callbackManager = CallbackManager.Factory.create()
            LoginManager.getInstance().registerCallback(
                callbackManager,
                object : FacebookCallback<LoginResult> {
                    override fun onSuccess(loginResult: LoginResult) {
                        // Signed in successfully, forward credentials to MongoDB Realm.
                        val accessToken = loginResult.accessToken
                        val facebookCredentials: Credentials =
                            Credentials.facebook(accessToken.token)
                        app.loginAsync(facebookCredentials) {
                            if (it.isSuccess) {
                                Log.v(
                                    "AUTH",
                                    "Successfully logged in to MongoDB Realm using Facebook OAuth."
                                )
                            } else {
                                Log.e("AUTH", "Failed to log in to MongoDB Realm", it.error)
                            }
                        }
                    }

                    override fun onCancel() {
                        Log.v("AUTH", "Cancelled Facebook login")
                    }

                    override fun onError(exception: FacebookException) {
                        Log.e("AUTH", "Failed to authenticate with Facebook: ${exception.message}")
                    }
                })
        }
        LoginManager.getInstance().logIn(activity, null)
    }

    @Test fun testGoogleOAuth() {
        ActivityScenario.launch(AuthActivity::class.java)
    }

    @Test fun testSignInWithApple() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch IDToken using Apple SDK

            val appleCredentials: Credentials = Credentials.apple("<token>")

            var user: User? = null
            app.loginAsync(appleCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
            }
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
                    user?.logOutAsync {
                        if (it.isSuccess) {
                            Log.v("AUTH", "Successfully logged out.")
                        } else {
                            Log.e("AUTH", it.error.toString())
                        }
                    }
                } else {
                    Log.e("AUTH", it.error.toString())
                }

            }
        }
        expectation.await()
    }
}
