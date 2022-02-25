package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.PrimaryKey
import io.realm.internal.platform.runBlocking
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import io.realm.query
import io.realm.query.RealmSingleQuery
import kotlin.random.Random
import kotlin.test.Test
import kotlinx.coroutines.flow.Flow

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
            val frogs: Frog? = realm.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun findAllObjectsOfATypeTest() {
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
            // :code-block-start: find-all-objects-of-a-type
            val frogs: RealmResults<Frog> = realm.query<Frog>().find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun sortTest() {
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
            // :code-block-start: sort
            // sort in descending order, frogs with distinct owners, only the first 5
            val frogs: RealmResults<Frog> =
                realm.query<Frog>("name = 'George Washington' SORT(age DESC) DISTINCT(owner) LIMIT(5)").find()
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun iterationTest() {
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
            // :code-block-start: iteration
            // fetch frogs from a realm as Flowables
            val frogsFlow: Flow<RealmResults<Frog>> = realm.query<Frog>().asFlow()
            
            // iterate through the flow with collect, printing each item
            frogsFlow.collect { frog ->
                Log.v("Frog: $frog")
            }
            // :code-block-end:
            realm.close()
        }
    }
}