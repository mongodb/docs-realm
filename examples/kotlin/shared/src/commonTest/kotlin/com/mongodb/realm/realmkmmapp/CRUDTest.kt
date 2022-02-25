package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.PrimaryKey
import io.realm.delete
import io.realm.internal.platform.freeze
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
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
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
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
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
        val REALM_NAME = getRandom()
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
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
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
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
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
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

    //@Test TODO: investigate why this flow collect() call hangs
    fun iterationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: iteration
            // fetch frogs from the realm as Flowables
            val frogsFlow: Flow<RealmResults<Frog>> = realm.query<Frog>().asFlow()

            // iterate through the flow with collect, printing each item
            frogsFlow.collect { frog ->
                Log.v("Frog: $frog")
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun deleteAllObjectsOfATypeTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: delete-all-objects-of-a-type
            realm.writeBlocking {
                // fetch all frogs from the realm
                val frogs: RealmResults<Frog> = this.query<Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                frogs.delete()
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun deleteMultipleObjectsTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: delete-multiple-objects
            realm.writeBlocking {
                // fetch 7 frogs of the bullfrog species from the realm
                val frogs: RealmResults<Frog> =
                    this.query<Frog>("species == 'bullfrog' LIMIT(7)").find()
                // call delete on the results of a query to delete those objects permanently
                frogs.delete()
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun deleteAnObjectTest() {
        val REALM_NAME = getRandom()
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: delete-an-object
            realm.writeBlocking {
                // fetch the frog by primary key value, passed in as argument number 0
                val frogs: RealmResults<Frog> =
                    this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find()
                // call delete on the results of a query to delete the object permanently
                frogs.delete()
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun modifyAnObjectTest() {
        val REALM_NAME = getRandom()
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: modify-an-object
            realm.writeBlocking {
                // fetch a frog from the realm by primary key
                val frog: Frog? =
                    this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
                // modify the frog's age in the write transaction to persist the new age to the realm
                frog?.age = 42
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun upsertAnObjectTest() {
        val REALM_NAME = getRandom()
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)

        runBlocking {
            val config = RealmConfiguration.Builder()
                .schema(setOf(Frog::class))
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(REALM_NAME)
                .path(randomTmpRealmPath()) // :hide: // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // insert an object that meets our example query
            realm.writeBlocking {
                val frog = this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // :code-block-start: upsert-an-object
            realm.writeBlocking {
                // fetch a frog from the realm based on some query
                val frog: Frog? =
                    this.query<Frog>("name == 'Wirt'").first().find()
                // if the query returned an object, update object from the query
                if (frog != null) {
                    frog.age = 4
                    frog.species = "Greyfrog"
                    frog.owner = "L'oric"
                } else {
                    // if the query returned no object, insert a new object with a new primary key.
                    this.copyToRealm(Frog().apply {
                        _id = Random.nextLong(1000000)
                        name = "Wirt"
                        age = 4
                        species = "Greyfrog"
                        owner = "L'oric"
                    })
                }
            }
            // :code-block-end:
            realm.close()
        }
    }
}