package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SubscriptionSetState
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.query.RealmResults
import kotlinx.coroutines.delay
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds

class BundleTest: RealmTest() {
    @Test
    fun bundleSyncedRealm(){
        val credentials = Credentials.anonymous(reuseExisting = false)

        runBlocking {
            // :snippet-start: bundle-synced-realm-create-realm
            val app = App.create(yourFlexAppId)

            // Login with user that has the server-side permissions to
            // read and write the data you want in the asset realm
            val user = app.login(credentials)

            // Create a SyncConfiguration to open a synced realm to use as the asset realm
            val assetRealmConfig = SyncConfiguration.Builder(user, setOf(Item::class))
                .name("asset.realm")
                // Add a subscription that matches the data being added
                // and your app's backend permissions
                .initialSubscriptions{ realm ->
                    add(
                        realm.query<Item>("isComplete == $0", false), "Incomplete Items")
                }
                .build()
            val assetRealm = Realm.open(assetRealmConfig)

            // :remove:
            assetRealm.subscriptions.waitForSynchronization(10.seconds)
            assertEquals(SubscriptionSetState.COMPLETE, assetRealm.subscriptions.state)
            // :remove:

            assetRealm.writeBlocking {
                // :remove-start:
                // delete to start fresh
                val myItems: RealmResults<Item> = this.query<Item>().find()
                delete(myItems)
                // :remove-end:
                // Add seed data to the synced realm
                copyToRealm(Item().apply {
                    summary = "Make sure the app has the data it needs"
                    isComplete = false
                })
            }
            // Verify the data in the existing realm
            // (this data should also be in the bundled realm we open later)
            val assetItems: RealmResults<Item> = assetRealm.query<Item>().find()
            for(item in assetItems) {
                Log.v("Item in the assetRealm: ${item.summary}")
            }
            assertEquals(1, assetItems.count()) // :remove:

            // IMPORTANT: Sync all changes with server before copying the synced realm
            assetRealm.syncSession.uploadAllLocalChanges(30.seconds)
            assetRealm.syncSession.downloadAllServerChanges(30.seconds)
            // :snippet-end:

            // :snippet-start: bundle-synced-realm-create-copy-config
            // Create a SyncConfiguration for the bundled copy.
            // The file name for this bundled copy is different than the initial realm file.
            // The initialRealmFile value is the `name` property of the asset realm you're bundling.
            val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
                .name("prefilled.realm")
                .initialRealmFile("asset.realm")
                .build()
            // :snippet-end:

            // :snippet-start: bundle-synced-realm-copy-realm
            // Copy the synced realm with writeCopyTo()
            assetRealm.writeCopyTo(copyConfig)

            // Get the path to the copy you just created.
            // You must move this file into the appropriate location for your app's platform.
            Log.v("Bundled realm location: ${copyConfig.path}")

            assetRealm.close()
            // :snippet-end:

            // :snippet-start: bundle-synced-realm-open-copied-realm
            // After moving the bundled realm to the appropriate location for your app's platform,
            // open and use the bundled realm as usual.
            val copiedRealm = Realm.open(copyConfig)

            // This should contain the same Items as in the asset realm
            val copiedItems: RealmResults<Item> = copiedRealm.query<Item>().find()
            for(item in copiedItems) {
                Log.v("Item in the copiedRealm: ${item.summary}")
            }

            assertEquals(1, copiedItems.count()) // :remove:
            copiedRealm.close()
            // :snippet-end:
        }
    }
    @Test
    fun bundleLocalRealm(){
        // :snippet-start: bundle-local-realm-create-realm
        // Open a local realm to use as the asset realm
        val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("original.realm")
            .build()
        val originalRealm = Realm.open(originalConfig)

        originalRealm.writeBlocking {
            // :remove-start:
            // delete to start fresh
            val myItems: RealmResults<Item> = this.query<Item>().find()
            delete(myItems)
            // :remove-end:
            // Add seed data to the original realm
            copyToRealm(Item().apply {
                summary = "Write an awesome app"
                isComplete = false
            })
        }

        // Verify the data in the existing realm
        // (this data should also be in the bundled realm we open later)
        val originalItems: RealmResults<Item> = originalRealm.query<Item>().find()
        for(item in originalItems) {
            Log.v("Item in the originalRealm: ${item.summary}")
        }
        // :snippet-end:
        assertEquals(1, originalItems.count())

        // :snippet-start: bundle-local-realm-copy-config
        // Create a RealmConfiguration for the bundled copy.
        // The file name for this bundled copy is different than the initial realm file.
        // The initialRealmFile value is the `name` property of the asset realm you're bundling.
        val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("bundled.realm")
            .initialRealmFile("original.realm")
            .build()
        // :snippet-end:
        Realm.deleteRealm(copyConfig)

        // :snippet-start: bundle-local-realm-copy-realm
        // Copy the realm data
        originalRealm.writeCopyTo(copyConfig)

        // Get the path to the copy you just created.
        // You must move this file into the appropriate location for your app's platform.
        Log.v("Bundled realm location: ${copyConfig.path}")

        originalRealm.close()
        // :snippet-end:

        // :snippet-start: bundle-local-realm-open-copied-realm
        // After moving the bundled realm to the appropriate location for your app's platform,
        // open and use the bundled realm as usual.
        val bundledRealm = Realm.open(copyConfig)
        val bundledItems: RealmResults<Item> = bundledRealm.query<Item>().find()
        for(item in bundledItems) {
            Log.v("Item in the bundledRealm: ${item.summary}")
        }
        assertEquals(1, bundledItems.count()) // :remove:
        bundledRealm.close()
        // :snippet-end:
    }
}