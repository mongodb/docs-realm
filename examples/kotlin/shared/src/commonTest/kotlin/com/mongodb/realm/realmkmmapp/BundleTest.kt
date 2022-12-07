package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import kotlin.test.Test
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.query.RealmResults
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds

class BundleTest: RealmTest() {
    @Test
    fun bundleSyncedRealm(){
        val app = App.create("application-14-pbs-sfpjd")

        // :snippet-start: bundle-synced-realm
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val originalConfig = SyncConfiguration.Builder(user, "MyPartition", setOf(Item::class))
                .name("original-path")
                .build()
            // open an existing realm
            val originalRealm = Realm.open(originalConfig)

            originalRealm.writeBlocking {
                // :remove-start:
                // delete to start fresh
                val myItems: RealmResults<Item> = this.query<Item>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(myItems)
                // :remove-end:

                // add some seed data to the original realm
                copyToRealm(Item().apply {
                    summary = "Do the laundry"
                    isComplete = false
                })
            }

            val copyConfig = SyncConfiguration.Builder(user, "MyPartition", setOf(Item::class))
                .name("copy-path")
                .build()

            // Make sure the file doesn't already exist
            Realm.deleteRealm(copyConfig)


            // IMPORTANT: When copying a Synced realm, you must ensure
            // that there are no pending Sync operations. You do this
            // by calling uploadAllLocalChanges() and downloadAllServerChanges():
            originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
            originalRealm.syncSession.downloadAllServerChanges(30.seconds)

            // Copy the realm
            originalRealm.writeCopyTo(copyConfig)

            val copyRealm = Realm.open(copyConfig)
            val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
            for(item in copiedItems) {
                Log.v("My copied Item: ${item.summary}") // you should see the seed data you created earlier
            }

            // :remove-start:
            assertEquals(1, copyRealm.query<Item>().find().size)
            // :remove-end:
        }
        // :snippet-end:
    }
    @Test
    fun bundleLocalRealm(){
        // :snippet-start: bundle-local-realm
        // open an existing realm
        val originalConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("original-realm")
            .build()
        val originalRealm = Realm.open(originalConfig)

        originalRealm.writeBlocking {
            // :remove-start:
            // delete to start fresh
            val myItems: RealmResults<Item> = this.query<Item>().find()
            // call delete on the results of a query to delete those objects permanently
            delete(myItems)
            // :remove-end:

            // add some seed data to the original realm
            copyToRealm(Item().apply {
                summary = "Do the dishes"
                isComplete = false
            })
        }

        // Create a RealmConfiguration for the copy
        val copyConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
            .name("copy-realm")
            .build()

        // Make sure the file doesn't already exist
        Realm.deleteRealm(copyConfig)

        // Copy the realm
        originalRealm.writeCopyTo(copyConfig)

        val copyRealm = Realm.open(copyConfig)
        val copiedItems: RealmResults<Item> = copyRealm.query<Item>().find()
        for(item in copiedItems) {
            Log.v("My copied Item: ${item.summary}") // you should see the seed data you created earlier
        }

        // :remove-start:
        assertEquals(1, copyRealm.query<Item>().find().size)
        // :remove-end:

        // :snippet-end:

    }
}

/*
// open an existing realm
var existingConfig = new PartitionSyncConfiguration("myPartition", user);
var realm = await Realm.GetInstanceAsync(existingConfig);

// Create a RealmConfiguration for the *copy*
// Be sure the partition name matches the original
var bundledConfig = new PartitionSyncConfiguration("myPartition", user, "bundled.realm");

// Make sure the file doesn't already exist
Realm.DeleteRealm(bundledConfig);

// IMPORTANT: When copying a Synced realm, you must ensure
// that there are no pending Sync operations. You do this
// by calling WaitForUploadAsync() and WaitForDownloadAsync():
var session = realm.SyncSession;
await session.WaitForUploadAsync();
await session.WaitForDownloadAsync();

// Copy the realm
realm.WriteCopy(bundledConfig);

// Want to know where the copy is?
var locationOfCopy = existingConfig.DatabasePath;

 */