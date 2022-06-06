package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.InitialResults
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.query.RealmQuery
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.query.Sort
import io.realm.kotlin.types.ObjectId
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.flow.Flow

class CRUDTest: RealmTest() {

    class Frog : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId.create()
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
                // :snippet-start: run-a-transaction
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
                // :snippet-end:
            }
            asyncCall.cancel() // :remove:
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
                // :snippet-start: create-a-new-object
                realm.write {
                    this.copyToRealm(Frog().apply {
                        name = "Kermit"
                        age = 45
                        species = "Green"
                        owner = "Jim"
                    })
                }
                // :snippet-end:
            }
            asyncCall.await()
            asyncCall.cancel() // :remove:
            Log.v("Number of frogs in realm : ${realm.query<Frog>().find().size}")
            assertEquals(1, realm.query<Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun findObjectByPrimaryKeyTest() {
        val PRIMARY_KEY_VALUE = ObjectId.create()
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
            // :snippet-start: find-object-by-primary-key
            // Search equality on the primary key field name
            val frogs: Frog? = realm.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
            // :snippet-end:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: find-all-objects-of-a-type
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
            asyncCall.cancel() // :remove:

            // fetch all objects of a type as a results collection, synchronously
            val frogs: RealmResults<Frog> = realm.query<Frog>().find()
            for(frog in frogs) {
                Log.v("Frog: $frog")
            }
            // :snippet-end:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = ObjectId.create()
                    name = "Wirt2"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            // insert an object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = ObjectId.create()
                    name = "Wirt3"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: sort
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
            asyncCallConvenience.cancel() // :remove:

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
            asyncCallLessConvenient.cancel() // :remove:
            // :snippet-end:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            // insert another object that meets our example query
            realm.writeBlocking {
                this.copyToRealm(Frog().apply {
                    _id = ObjectId.create()
                    name = "Wirt2"
                    age = 44
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: iteration
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
            // :snippet-end:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :snippet-start: delete-all-objects-of-a-type
                realm.write {
                    // fetch all frogs from the realm
                    val frogs: RealmResults<Frog> = this.query<Frog>().find()
                    // call delete on the results of a query to delete those objects permanently
                    delete(frogs)
                }
                // :snippet-end:
            }
            asyncCall.await()
            asyncCall.cancel() // :remove:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "bullfrog"
                    owner = "Jim"
                })
            }

            Log.v("Successfully opened realm: ${realm.configuration.name}")
            val asyncCall: Deferred<Unit> = async {
                // :snippet-start: delete-multiple-objects
                realm.write {
                    // fetch 7 frogs of the bullfrog species from the realm
                    val frogs: RealmResults<Frog> =
                        this.query<Frog>("species == 'bullfrog' LIMIT(7)").find()
                    // call delete on the results of a query to delete those objects permanently
                    frogs.also { delete(it) }
                }
                // :snippet-end:
            }
            asyncCall.cancel() // :remove:
            realm.close()
        }
    }

    @Test
    fun deleteAnObjectTest() {
        val PRIMARY_KEY_VALUE = ObjectId.create()
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
                // :snippet-start: delete-an-object
                realm.write {
                    // fetch the frog by primary key value, passed in as argument number 0
                    val frog: Frog? =
                        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
                    // call delete on the results of a query to delete the object permanently
                    frog?.also { delete(it) }
                }
                // :snippet-end:
            }
            asyncCall.cancel() // :remove:
            realm.close()
        }
    }

    @Test
    fun modifyAnObjectTest() {
        val PRIMARY_KEY_VALUE = ObjectId.create()
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
                // :snippet-start: modify-an-object
                realm.write {
                    // fetch a frog from the realm by primary key
                    val frog: Frog? =
                        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
                    // modify the frog's age in the write transaction to persist the new age to the realm
                    frog?.age = 42
                }
                // :snippet-end:
            }
            asyncCall.cancel() // :remove:
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
                    _id = ObjectId.create()
                    name = "Wirt"
                    age = 45
                    species = "Green"
                    owner = "Jim"
                })
            }
            val asyncCall: Deferred<Unit> = async {
                // :snippet-start: upsert-an-object
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
                            _id = ObjectId.create()
                            name = "Wirt"
                            age = 4
                            species = "Greyfrog"
                            owner = "L'oric"
                        })
                    }
                }
                // :snippet-end:
            }
            asyncCall.cancel() // :remove:
            realm.close()
        }
    }

    @Test
    fun updateCollectionTest() {
        runBlocking {
            val config =
                RealmConfiguration.Builder(schema = setOf(Frog::class))
                    // :remove-start:
                    .directory("/tmp/")
                    .name(getRandom())
                    // :remove-end:
                    .build()
            val realm = Realm.open(config)
            // :snippet-start: update-a-collection
            val tadpoles: RealmQuery<Frog> =
                realm.query<Frog>("age > $0", 2)
            for (tadpole in tadpoles.find()) {
                realm.write {
                    findLatest(tadpole)?.name = tadpole.name + " Jr."
                }
            }
            // :snippet-end:
        }
    }
}