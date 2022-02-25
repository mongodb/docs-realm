package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import io.realm.query
import kotlin.random.Random
import kotlin.test.Test

class CRUDTest: RealmTest() {

    class Frog : RealmObject {
        @PrimaryKey
        var _id: Long = Random.nextLong(1000000)
        var name: String = ""
        var age: Int = 0
        var species: String? = null
        var owner: String? = null
    }

    @Test
    fun writeTransactionTest() {
        val PARTITION = getRandom()

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: run-a-transaction
            realm.writeBlocking {
                // create a frog object in the realm
                val frog = this.copyToRealm(Frog().apply {
                    name = "Kermit"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })

                // update the frog
                frog.age = frog.age + 1

                // get all frogs that belong to Jim
                val jimsFrogs = this.query<Frog>("owner == 'Jim'").find()

                // give all of Jim's frogs to Brian
                jimsFrogs.forEach {
                    it.owner = "Brian"
                }
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun createNewObjectTest() {
        val PARTITION = getRandom()

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: create-a-new-object
            realm.writeBlocking {
                val frog = this.copyToRealm(Frog().apply {
                    name = "Kermit"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun findObjectByPrimaryKeyTest() {
        val PARTITION = getRandom()
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: find-object-by-primary-key
            // Search equality on the primary key field name
            realm.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find()
            // :code-block-end:
            realm.close()
        }
    }
}