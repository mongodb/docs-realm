package com.mongodb.realm.realmkmmapp

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.PrimaryKey
import io.realm.internal.platform.runBlocking
import io.realm.notifications.InitialResults
import io.realm.notifications.ResultsChange
import io.realm.query
import io.realm.query.RealmQuery
import io.realm.query.Sort
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
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
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: run-a-transaction
                realm.write {
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
            }
            asyncCall.cancel() // :hide:
            realm.close()
        }
    }

    @Test
    fun createNewObjectTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: create-a-new-object
                realm.write {
                    this.copyToRealm(Frog().apply {
                        name = "Kermit"
                        age = 45
                        species = "Green"
                        owner = "Jim"
                    })
                }
                // :code-block-end:
            }
            asyncCall.await()
            asyncCall.cancel() // :hide:
            Log.v("Number of frogs in realm : ${realm.query<Frog>().find().size}")
            assertEquals(1, realm.query<Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun findObjectByPrimaryKeyTest() {
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
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
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: find-all-objects-of-a-type
            // fetch all objects of a type as a flow, asynchronously
            val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()
            val asyncCall: Deferred<Unit> = async {
                frogsFlow.collect { results ->
                    when (results) {
                        // print out initial results
                        is InitialResults<Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        } else -> {
                            // do nothing on changes
                        }
                    }
                }
            }
            asyncCall.cancel() // :hide:

            // fetch all objects of a type as a results collection, synchronously
            val frogs: RealmResults<Frog> = realm.query<Frog>().find()
            for(frog in frogs) {
                Log.v("Frog: $frog")
            }
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun sortTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt2"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt3"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: sort
            // sort in descending order, frogs with distinct owners, only the first 5, with convenience methods
            val convenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
                realm.query<Frog>("name = 'George Washington'")
                    .sort("age", Sort.DESCENDING).distinct("owner").limit(5).asFlow()
            val asyncCallConvenience: Deferred<Unit> = async {
                convenientlyOrganizedFrogs.collect { results ->
                    when (results) {
                        // print out initial results
                        is InitialResults<Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        } else -> {
                            // do nothing on changes
                        }
                    }
                }
            }
            asyncCallConvenience.cancel() // :hide:

            // sort in descending order, frogs with distinct owners, only the first 5, using RQL
            val somewhatLessConvenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
                realm.query<Frog>("name = 'George Washington' SORT(age DESC) DISTINCT(owner) LIMIT(5)").asFlow()
            val asyncCallLessConvenient: Deferred<Unit> = async {
                somewhatLessConvenientlyOrganizedFrogs.collect { results ->
                    when (results) {
                        // print out initial results
                        is InitialResults<Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        } else -> {
                            // do nothing on changes
                        }
                    }
                }
            }
            asyncCallLessConvenient.cancel() // :hide:
            // :code-block-end:
            realm.close()
        }
    }

    @Test
    fun iterationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)

            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            // insert another object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt2"
                    age = 44
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :code-block-start: iteration
            // fetch frogs from the realm as Flowables
            val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()

            // iterate through the flow with collect, printing each item
            val frogsObserver: Deferred<Unit> = async {
                frogsFlow.collect { results ->
                    when (results) {
                        // print out initial results
                        is InitialResults<Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        }
                        else -> {
                            // do nothing on changes
                        }
                    }
                }
            }

            // ... some time later, cancel the flow so you can safely close the realm
            frogsObserver.cancel()
            realm.close()
            // :code-block-end:
        }
    }

    @Test
    fun deleteAllObjectsOfATypeTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)

            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: delete-all-objects-of-a-type
                realm.write {
                    // fetch all frogs from the realm
                    val frogs: RealmResults<Frog> = this.query<Frog>().find()
                    // call delete on the results of a query to delete those objects permanently
                    delete(frogs)
                }
                // :code-block-end:
            }
            asyncCall.await()
            asyncCall.cancel() // :hide:
            assertEquals(0, realm.query<Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun deleteMultipleObjectsTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)

            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "bullfrog"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: delete-multiple-objects
                realm.write {
                    // fetch 7 frogs of the bullfrog species from the realm
                    val frogs: RealmResults<Frog> =
                        this.query<Frog>("species == 'bullfrog' LIMIT(7)").find()
                    // call delete on the results of a query to delete those objects permanently
                    frogs.also { delete(it) }
                }
                // :code-block-end:
            }
            asyncCall.cancel() // :hide:
            realm.close()
        }
    }

    @Test
    fun deleteAnObjectTest() {
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)

            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: delete-an-object
                realm.write {
                    // fetch the frog by primary key value, passed in as argument number 0
                    val frog: Frog? =
                        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
                    // call delete on the results of a query to delete the object permanently
                    frog?.also { delete(it) }
                }
                // :code-block-end:
            }
            asyncCall.cancel() // :hide:
            realm.close()
        }
    }

    @Test
    fun modifyAnObjectTest() {
        val PRIMARY_KEY_VALUE = Random.nextLong(1000000)
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)

            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: modify-an-object
                realm.write {
                    // fetch a frog from the realm by primary key
                    val frog: Frog? =
                        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
                    // modify the frog's age in the write transaction to persist the new age to the realm
                    frog?.age = 42
                }
                // :code-block-end:
            }
            asyncCall.cancel() // :hide:
            realm.close()
        }
    }

    @Test
    fun upsertAnObjectTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = Random.nextLong(1000000)
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            val asyncCall: Deferred<Unit> = async {
                // :code-block-start: upsert-an-object
                realm.write {
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
            }
            asyncCall.cancel() // :hide:
            realm.close()
        }
    }

    @Test
    fun updateCollectionTest() {
        runBlocking {
            val config =
                RealmConfiguration.Builder(schema = setOf(com.mongodb.realm.realmkmmapp.Frog::class))
                    // :hide-start:
                    .directory("/tmp/")
                    .name(getRandom())
                    // :hide-end:
                    .build()
            val realm = Realm.open(config)
            // :code-block-start: update-a-collection
            val tadpoles: RealmQuery<com.mongodb.realm.realmkmmapp.Frog> =
                realm.query<com.mongodb.realm.realmkmmapp.Frog>("age > $0", 2)
            for (tadpole in tadpoles.find()) {
                realm.write {
                    findLatest(tadpole)?.name = tadpole.name + " Jr."
                }
            }
            // :code-block-end:
        }
    }
}