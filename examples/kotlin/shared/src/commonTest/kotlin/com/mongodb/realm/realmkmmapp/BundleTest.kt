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
import kotlin.time.Duration.Companion.seconds

class BundleTest: RealmTest() {
    @Test
    fun bundleARealm(){
        val app = App.create(YOUR_APP_ID)
        // :snippet-start: bundle-synced-realm
        runBlocking {
            // :hide-start:
            val user = app.login(Credentials.anonymous())
            // :hide-end:
            // open an existing realm
            val originalConfig = SyncConfiguration.Builder(user, setOf(SyncTest.Toad::class))
                .name("original-realm")
                .initialSubscriptions { realm ->
                    add(
                        realm.query<SyncTest.Toad>(
                            "name == $0",
                            "name value"
                        ),
                        "subscription name"
                    )
                }
                .build()
            val originalRealm = Realm.open(originalConfig)

            // Create a RealmConfiguration for the copy
            // Be sure the subscription matches the original
            val copyConfig = SyncConfiguration.Builder(user, setOf(SyncTest.Toad::class))
                .name("copy-realm")
                .initialSubscriptions { realm ->
                    add(
                        realm.query<SyncTest.Toad>(
                            "name == $0",
                            "name value"
                        ),
                        "subscription name"
                    )
                }
                .build()

            // IMPORTANT: When copying a Synced realm, you must ensure
            // that there are no pending Sync operations. You do this
            // by calling uploadAllLocalChanges() and downloadAllServerChanges():
            originalRealm.syncSession.uploadAllLocalChanges(30.seconds)
            originalRealm.syncSession.downloadAllServerChanges(30.seconds)
            
            // Copy the realm
            originalRealm.writeCopyTo(copyConfig)
        }
        // :snippet-end:
    }
    @Test
    fun bundleALocalRealm(){
        // :snippet-start: bundle-local-realm
        // open an existing realm
        val originalConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
            .name("original-realm")
            .build()
        val originalRealm = Realm.open(originalConfig)

        // Create a RealmConfiguration for the copy
        val copyConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
            .name("copy-realm")
            .build()

        // Make sure the file doesn't already exist
        Realm.deleteRealm(copyConfig)

        // Copy the realm
        originalRealm.writeCopyTo(copyConfig)
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