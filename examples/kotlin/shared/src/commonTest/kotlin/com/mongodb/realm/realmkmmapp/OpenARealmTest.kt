package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.time.Duration.Companion.seconds

// :replace-start: {
//   "terms": {
//     "yourAppId": "YOUR_APP_ID",
//     "yourFlexAppId": "YOUR_APP_ID"
//   }
// }

class OpenARealmTest: RealmTest() {

    class Toad: RealmObject {
        @PrimaryKey
        var _id: ObjectId = BsonObjectId()
        var name: String = ""
    }
    @Test
    fun openAndCloseARealmTest() {
        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(Toad::class))
                // :remove-start:
                .directory("/tmp/") // default location for jvm is... in the project root
                // :remove-end:
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
            // :snippet-start: close-a-realm
            realm.close()
            // :snippet-end:
        }
    }
    @Test
    fun deleteRealmIfMigrationNeeded() {
        val REALM_NAME = getRandom()
        runBlocking {
            // :snippet-start: delete-realm-if-migration-needed
            val config = RealmConfiguration.Builder(setOf(Toad::class))
                // :remove-start:
                .name(REALM_NAME)
                // :remove-end:
                .deleteRealmIfMigrationNeeded()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
        }
    }
    @Test
    fun onAnInMemoryRealm() {
        runBlocking {
            // :snippet-start: open-an-in-memory-realm
            val config = RealmConfiguration.Builder(setOf(Toad::class))
                .inMemory()
                .build()

            val realm = Realm.open(config)
            Log.v("Successfully opened an in memory realm")
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun syncToLocalRealm() {
        // :snippet-start: sync-to-local-realm
        // Instantiate the synced realm with your App ID
        val app = App.create(yourFlexAppId)

        runBlocking {
            val user = app.login(Credentials.anonymous())
            // Create the synced realm configuration
            val syncConfig = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>("name == $0", "name value"),
                        "subscription name"
                    )
                }
                .build()

            // Open the synced realm and add data to it
            val syncRealm = Realm.open(syncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            syncRealm.write {
                this.copyToRealm(Toad().apply {
                    name = "Kermit"
                })
            }
            // Wait for write to sync
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)

            // Create the local realm
            val localConfig = RealmConfiguration.Builder(setOf(Toad::class))
                .name("local.realm")
                .build()
            // Copy data from synced realm to the new realm
            syncRealm.writeCopyTo(localConfig)
            // Close the synced realm when you're done copying
            syncRealm.close()

            // Open the new local realm
            val localRealm = Realm.open(localConfig)

            // Copied Toad object is available in the new realm
            val toad: Toad =
                localRealm.query<Toad>().find().first()
            Log.v("Copied Toad: ${toad.name}")

            localRealm.close()
            Realm.deleteRealm(syncConfig) // :remove:
            Realm.deleteRealm(localConfig) // :remove:
        }
        // :snippet-end:
    }
    @Test
    fun inMemoryToLocalRealm() {
        // :snippet-start: in-memory-to-local-realm
        runBlocking {
            // Create the in-memory realm
            val inMemoryConfig = RealmConfiguration.Builder(setOf(Toad::class))
                .name("inMemory.realm")
                .inMemory()
                .build()

            // Open the realm and add data to it
            val inMemoryRealm = Realm.open(inMemoryConfig)
            inMemoryRealm.write {
                this.copyToRealm(Toad().apply {
                    name = "Kermit"
                })
            }

            // Create the local realm
            val localConfig = RealmConfiguration.Builder(setOf(Toad::class))
                .name("local.realm")
                .build()
            // Copy data from `inMemoryRealm` to the new realm
            inMemoryRealm.writeCopyTo(localConfig)
            // Close the original realm when you're done copying
            inMemoryRealm.close()

            // Open the new local realm
            val localRealm = Realm.open(localConfig)

            // Copied Toad object is available in the new realm
            val toad: Toad =
                localRealm.query<Toad>().find().first()
            Log.v("Copied Toad: ${toad.name}")

            localRealm.close()
            Realm.deleteRealm(inMemoryConfig) // :remove:
            Realm.deleteRealm(localConfig) // :remove:
        }
        // :snippet-end:
    }
    @Test
    fun unencryptedToEncryptedRealm() {
        // :snippet-start: unencrypted-to-encrypted-realm
        runBlocking {
            // Create the unencrypted realm
            val unencryptedConfig = RealmConfiguration.Builder(setOf(Toad::class))
                .name("unencrypted.realm")
                .build()

            // Open the realm and add data to it
            val unencryptedRealm = Realm.open(unencryptedConfig)

            unencryptedRealm.write {
                this.copyToRealm(Toad().apply {
                    name = "Kermit"
                })
            }

            // ... Generate encryption key ...

            // Create the encrypted realm
            val encryptedConfig = RealmConfiguration.Builder(setOf(Toad::class))
                .name("encrypted.realm")
                .encryptionKey(getEncryptionKey())
                .build()

            // Copy data from `unencryptedRealm` to the new realm
            // Data is encrypted as part of the copy process
            unencryptedRealm.writeCopyTo(encryptedConfig)

            // Close the original realm when you're done copying
            unencryptedRealm.close()

            // Open the new encrypted realm
            val encryptedRealm = Realm.open(encryptedConfig)

            // Copied Toad object is available in the new realm
            val toad: Toad =
                encryptedRealm.query<Toad>().find().first()
            Log.v("Copied Toad: ${toad.name}")

            encryptedRealm.close()
            Realm.deleteRealm(unencryptedConfig) // :remove:
            Realm.deleteRealm(encryptedConfig) // :remove:
        }
        // :snippet-end:
    }
}
        // :replace-end: