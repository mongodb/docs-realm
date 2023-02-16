package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.query.RealmResults
import kotlin.test.Ignore
import kotlin.test.Test
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

class BundleTest: RealmTest() {
    @Test
    @Ignore
    fun bundleSyncedRealm(){
        val YOUR_APP_ID = FLEXIBLE_APP_ID
        val credentials = Credentials.anonymous()

        // :snippet-start: bundle-synced-realm
        runBlocking {
            val app = App.create(YOUR_APP_ID)

            // Login with user that has the server-side permissions
            // of the users of the bundled realm
            val user = app.login(credentials)

            // Create a SyncConfiguration to open the existing synced realm
            val originalConfig = SyncConfiguration.Builder(user, setOf(Item::class))
                .name("original.realm")
                .build()
            val originalRealm = Realm.open(originalConfig)
            Log.v("${originalRealm.configuration.path}")

            // Add a subscription that matches the data being added
            // and your app's backend permissions
            originalRealm.subscriptions.update {
                this.add(originalRealm.query<Item>("summary == $0", "summary value"), "subscription name")
            }
            originalRealm.subscriptions.waitForSynchronization(Duration.parse("10s"))

            originalRealm.writeBlocking {
                // :remove-start:
                // delete to start fresh
                val myItems: RealmResults<Item> = this.query<Item>().find()
                delete(myItems)
                // :remove-end:
                // Add seed data to the synced realm
                copyToRealm(Item().apply {
                    summary = "Do the laundry"
                    isComplete = false
                })

                // Verify the data in the existing realm
                // (this data should also be in the bundled realm we open later)
                val originalItems: RealmResults<Item> = originalRealm.query<Item>().find()
                for(item in originalItems) {
                    Log.v("My Item: ${item.summary}")
                }
            }
            // IMPORTANT: Sync all changes with server before copying the synced realm
            originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
            originalRealm.syncSession.downloadAllServerChanges(30.seconds)

            // Create a SyncConfiguration for the bundled copy with a file name
            val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
                .name("bundled.realm")
                .build()

            Realm.deleteRealm(copyConfig) // :remove:

            // Copy the synced realm with writeCopyTo()
            originalRealm.writeCopyTo(copyConfig)

            // Get the path to the copy you just created
            Log.v("Bundled realm location: ${copyConfig.path}")

            // Verify the copied realm contains the data we expect
            val copyRealm = Realm.open(copyConfig)
            val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
            for(item in copiedItems) {
                Log.v("My copied Item: ${item.summary}")
            }

            originalRealm.close()
            copyRealm.close()
            // :remove-start:
            Realm.deleteRealm(originalConfig)
            Realm.deleteRealm(copyConfig)
            // :remove-end:
        }
        // :snippet-end:
    }
    @Test
    fun bundleLocalRealm(){
        // :snippet-start: bundle-local-realm
        // Open an existing local realm
        val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("original.realm")
            .build()
        val originalRealm = Realm.open(originalConfig)

        originalRealm.writeBlocking {
            // Add seed data to the original realm
            copyToRealm(Item().apply {
                summary = "Do the dishes"
                isComplete = false
            })
        }

        // Create a RealmConfiguration for the bundled copy
        val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("bundled.realm")
            .build()

        Realm.deleteRealm(copyConfig) // :remove:

        // Copy the realm data
        originalRealm.writeCopyTo(copyConfig)

        // Get the path to the copy you just created
        Log.v("Bundled realm location: ${copyConfig.path}")

        originalRealm.close()
        // :snippet-end:
    }
    @Test
    fun openARealmFromABundledFile(){
        /*
           realm file in src/main/assets/ folder required for this test
           If that file is deleted manually, this test will fail & you will have to re-bundle your realm
           into that folder.
        */

        // :snippet-start: open-from-bundled-file
        // Open the bundled realm from the assets folder
        val bundledConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .directory("src/main/assets")
            .name("bundled.realm")
            .build()
        val bundledRealm = Realm.open(bundledConfig)

        // Read and write to the bundled realm as normal
        bundledRealm.writeBlocking {
            copyToRealm(Item().apply {
                summary = "Add another Item to the realm"
                isComplete = true
            })
        }
        // :snippet-end:
        bundledRealm.close()
        Realm.deleteRealm(bundledConfig)
    }
}