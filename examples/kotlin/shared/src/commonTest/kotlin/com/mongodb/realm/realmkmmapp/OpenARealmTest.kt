package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.Test

class OpenARealmTest: RealmTest() {

    class Frog : RealmObject {
        @PrimaryKey
        var _id: ObjectId = BsonObjectId()
        var name: String = ""
        var age: Int = 0
        var species: String? = null
        var owner: String? = null
    }
    @Test
    fun openAndCloseARealmTest() {
        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder(setOf(Frog::class))
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
            val config = RealmConfiguration.Builder(setOf(Frog::class))
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
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                .inMemory()
                .build()

            val realm = Realm.open(config)
            Log.v("Successfully opened an in memory realm")
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun inMemoryToLocalRealm() {
        // :snippet-start: in-memory-to-local-realm
        // Create in-memory realm
        runBlocking {
            val inMemoryConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("inMemory.realm")
                .inMemory()
                .build()

            // Open the realm and add data to it
            val inMemoryRealm = Realm.open(inMemoryConfig)
            inMemoryRealm.write {
                this.copyToRealm(Frog().apply {
                    name = "Kermit"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            // Create the local realm
            val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("local.realm")
                .build()
            // Copy data from `inMemoryRealm` to the new realm
            inMemoryRealm.writeCopyTo(localConfig)
            // Close the original realm when you're done copying
            inMemoryRealm.close()

            // Open the new local realm
            val localRealm = Realm.open(localConfig)

            // Copied frog object is available in the new realm
            val frog: Frog =
                localRealm.query<Frog>().find().first()
            Log.v("Copied frog: ${frog.name}")

            localRealm.close()
            Realm.deleteRealm(inMemoryConfig) // :remove:
            Realm.deleteRealm(localConfig) // :remove:
        }
        // :snippet-end:
    }
    @Test
    fun unencryptedToEncryptedRealm() {
        // :snippet-start: unencrypted-to-encrypted-realm
        // Create unencrypted realm
        runBlocking {
            val unencryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("unencrypted.realm")
                .build()

            // Open the realm and add data to it
            val unencryptedRealm = Realm.open(unencryptedConfig)

            unencryptedRealm.write {
                this.copyToRealm(Frog().apply {
                    name = "Kermit"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            // ... Generate encryption key ...

            // Create the encrypted realm
            val encryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
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

            // Copied frog object is available in the new realm
            val frog: Frog =
                encryptedRealm.query<Frog>().find().first()
            Log.v("Copied frog: ${frog.name}")

            encryptedRealm.close()
            Realm.deleteRealm(unencryptedConfig) // :remove:
            Realm.deleteRealm(encryptedConfig) // :remove:
        }
        // :snippet-end:
    }
}