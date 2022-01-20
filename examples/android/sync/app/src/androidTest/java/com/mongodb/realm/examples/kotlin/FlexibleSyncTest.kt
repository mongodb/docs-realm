package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.Subscription
import io.realm.mongodb.sync.SyncConfiguration
import java.util.concurrent.TimeUnit
import org.junit.Test

class FlexibleSyncTest : RealmTest() {
    @Test
    fun openARealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :code-block-start: open-a-realm
            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    // :code-block-start: add-a-subscription
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "subscriptionName",
                                    realm.where(Frog::class.java) // :emphasize:
                                        .equalTo("species", "spring peeper")
                                )
                            ) // :emphasize:
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                        }
                    })
                    // :code-block-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
            // :code-block-end:
        }
        expectation.await()
    }

    @Test
    fun explicitlyNamedSubscription() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            // :code-block-start: explicitly-named-subscription
                            subscriptions.add(
                                Subscription.create(
                                    "frogSubscription",
                                    realm.where(Frog::class.java) // :emphasize:
                                        .equalTo("species", "spring peeper")
                                )
                            ) // :emphasize:

                            // later, you can look up this subscription by name
                            val subscription =
                                subscriptions.find("frogSubscription")
                            // :code-block-end:
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun implicitlyNamedSubscription() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            // :code-block-start: implicitly-named-subscription
                            subscriptions.add(
                                Subscription.create(
                                    null,
                                    realm.where(Frog::class.java) // :emphasize:
                                        .equalTo("species", "spring peeper")
                                )
                            ) // :emphasize:

                            // later, you can look up this subscription by query
                            val subscription =
                                subscriptions.find(
                                    realm.where(
                                        Frog::class.java
                                    )
                                        .equalTo("species", "spring peeper")
                                )
                            // :code-block-end:
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun waitForSubscriptionSync() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    // :code-block-start: wait-for-subscription-sync
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java) // :emphasize:
                                        .equalTo("species", "poison dart")
                                )
                            )
                        }
                        .waitForInitialRemoteData(
                            2112,
                            TimeUnit.MILLISECONDS
                        )
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                        }
                    })
                    // :code-block-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun updateNamedSubscription() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "treefrog")
                                )
                            )
                        }
                        .waitForInitialRemoteData(
                            2112,
                            TimeUnit.MILLISECONDS
                        )
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                            // :code-block-start: update-subscriptions-by-name
                            realm.subscriptions.update { subscriptions -> // to update a named subscription, create a replacement with
                                // the same name and add it to the subscription set
                                subscriptions.addOrUpdate(
                                    Subscription.create(
                                        "mySubscription",
                                        realm.where(Frog::class.java)
                                            .equalTo(
                                                "name",
                                                "Benedict Cumberburger"
                                            )
                                    )
                                )
                            }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun updateUnnamedSubscription() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "treefrog")
                                )
                            )
                            subscriptions.add(
                                Subscription.create(
                                    null,
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "cane toad")
                                )
                            )
                        }
                        .waitForInitialRemoteData(
                            2112,
                            TimeUnit.MILLISECONDS
                        )
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                            // :code-block-start: update-subscriptions-by-query
                            realm.subscriptions.update { subscriptions -> // to update an unnamed subscription, remove it from the
                                // subscription set, then add your new query to the set
                                val mySubscription =
                                    subscriptions.find(
                                        realm.where(
                                            Frog::class.java
                                        )
                                            .equalTo(
                                                "species",
                                                "cane toad"
                                            )
                                    )
                                subscriptions.remove(mySubscription)
                                subscriptions.addOrUpdate(
                                    Subscription.create(
                                        "mySubscription",
                                        realm.where(Frog::class.java)
                                            .equalTo(
                                                "name",
                                                "Benedict Cumberburger"
                                            )
                                    )
                                )
                            }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun removeSingleSubscription() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "treefrog")
                                )
                            )
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                            // :code-block-start: remove-single-subscription
                            realm.subscriptions.update { subscriptions ->
                                val mySubscription =
                                    subscriptions.find("mySubscription")
                                subscriptions.remove(mySubscription)
                            }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun removeAllSubscriptionsToAnObjectType() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "treefrog")
                                )
                            )
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                            // :code-block-start: remove-all-subscriptions-to-an-object-type
                            realm.subscriptions.update { subscriptions ->
                                subscriptions.removeAll(
                                    Frog::class.java
                                )
                            }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun removeAllSubscriptions() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // instantiate a Realm App connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val user = it.get()
                    val config = SyncConfiguration.Builder(app.currentUser())
                        .initialSubscriptions { realm, subscriptions ->
                            subscriptions.add(
                                Subscription.create(
                                    "mySubscription",
                                    realm.where(Frog::class.java)
                                        .equalTo("species", "treefrog")
                                )
                            )
                        }
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :hide-start:
                            expectation.fulfill()
                            // :hide-end:
                            // :code-block-start: remove-all-subscriptions
                            realm.subscriptions.update { subscriptions -> subscriptions.removeAll() }
                            // :code-block-end:
                        }
                    })
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }
}