package com.mongodb.realm.realmkmmapp

import io.github.aakira.napier.DebugAntilog
import io.github.aakira.napier.Napier
import io.github.aakira.napier.Napier.v
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.delete
import io.realm.internal.platform.ensureNeverFrozen
import io.realm.internal.platform.runBlocking
import io.realm.log.LogLevel
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.SyncConfiguration
import io.realm.query
import kotlin.random.Random
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainCoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class Person : RealmObject {
    var name: String = "Foo"
    var dog: Dog? = null
}

class Dog : RealmObject {
    var name: String = ""
    var age: Int = 0
}

class Frog : RealmObject {
    var name: String = ""
    var age: Int = 0
    var species: String = ""
    var owner: String? = null
}

class Task : RealmObject {
    var name: String = ""
    var status: String = ""
}

class Greeting {

    val YOUR_APP_ID: String = "kmm-example-testers-viybt"

    fun greeting(): String {
        Napier.base(DebugAntilog())
        getDogsTest()
        queryTest()
        updateTest()
        quickStartTest()
        changeListenersTest()
        anonymousAuthTest()
        emailPasswordAuthTest()
        emailPasswordRegistrationTest()
        logoutTest()
        syncTest()
        configureSyncTest()
        initializeAppClientTest()
        configureAppClientTest()
        return "Hello, ${Platform().platform}!"
    }

    fun getDogsTest(): String {
        val configuration = RealmConfiguration.with(schema = setOf(Person::class, Dog::class))
        val realm = Realm.open(configuration)

        // plain old kotlin object
        val person = Person().apply {
            name = "Carlo"
            dog = Dog().apply { name = "Fido"; age = 16 }
        }

        // persist it in a transaction
        realm.writeBlocking {
            val managedPerson = copyToRealm(person)
        }

        // All Persons
        val all = realm.query<Person>()

        // Person named 'Carlo'
        val filteredByName = realm.query<Person>().query("name = $0", "Carlo").find()

        // Person having a dog aged more than 7 with a name starting with 'Fi'
        val filteredByDog = realm.query<Person>().query("dog.age > $0 AND dog.name BEGINSWITH $1", 7, "Fi").find()

        // Find the first Person without a dog
        realm.query<Person>("dog == NULL LIMIT(1)")
            .first()
            .find()
            ?.also { personWithoutDog ->
                // Add a dog in a transaction
                realm.writeBlocking {
                    findLatest(personWithoutDog)?.dog = Dog().apply { name = "Laika"; age = 3 }
                }
            }

        // delete all Dogs
        realm.writeBlocking {
            query<Dog>().find().delete()
        }

        return ""
    }

    fun queryTest() {
        // :code-block-start: landing-page-query
        val config = RealmConfiguration.with(schema = setOf(Frog::class))
        val realm = Realm.open(config)
        val frogsQuery = realm.query<Frog>()
        val numTadpoles = frogsQuery.query("age > $0", 2).count()
        Log.v("Tadpoles: $numTadpoles")
        val numFrogsNamedJasonFunderburker = frogsQuery.query("name == $0", "Jason Funderburker").count()
        Log.v("Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")
        val numFrogsWithoutOwners = frogsQuery.query("owner == null").count()
        Log.v("Frogs without owners: $numFrogsWithoutOwners")
        // :code-block-end:
    }

    fun updateTest() {
        val configSetup = RealmConfiguration.with(schema = setOf(Frog::class))
        val realmSetup = Realm.open(configSetup)
        realmSetup.writeBlocking {
            copyToRealm(Frog().apply {
                name = "Benjamin Franklin"
                age = 12
                species = "bullfrog"
                owner = null
            })
        }
        // :code-block-start: landing-page-update
        val config = RealmConfiguration.with(schema = setOf(Frog::class))
        val realm = Realm.open(config)
        // start a write transaction
        realm.writeBlocking {
            // get a frog from the database to update
            val frog = query<Frog>()
                .query("name == $0 LIMIT(1)", "Benjamin Franklin").find()
            // change the frog's name
            frog[0].name = "George Washington"
            // change the frog's species
            frog[0].species = "American bullfrog"
        } // when the transaction completes, the frog's name and species
        // are updated in the database
        // :code-block-end:
    }

    fun quickStartTest() {
        // :code-block-start: quick-start
        // :code-block-start: quick-start-open-a-realm
        val config = RealmConfiguration.with(schema = setOf(Task::class))
        val realm: Realm = Realm.open(config)
        // :code-block-end:
        // :code-block-start: quick-start-create
        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Do work"
                status = "Open"
            })
        }
        // :code-block-end:
        // :code-block-start: quick-start-read
        // all tasks in the realm
        val tasks = realm.query<Task>().find()
        // :code-block-end:
        // :code-block-start: quick-start-read-filtered
        // all tasks in the realm
        val tasksThatBeginWIthD = realm.query<Task>("name BEGINSWITH $0", "D").find()
        val openTasks = realm.query<Task>("status == $0", "Open").find()
        // :code-block-end:
        // :code-block-start: quick-start-update
        realm.writeBlocking {
            findLatest(openTasks[0])?.status = "In Progress"
        }
        // :code-block-end:
        // :code-block-start: quick-start-delete
        realm.writeBlocking {
            findLatest(tasks[0])?.delete()
        }
        // :code-block-end:
        // :code-block-end:
    }

    fun changeListenersTest() {
        // :code-block-start: change-listeners
        val config = RealmConfiguration.with(schema = setOf(Task::class))
        val realm = Realm.open(config)

        // fetch objects from a realm as Flowables
        CoroutineScope(Dispatchers.Main).launch {
            val flow: Flow<RealmResults<Task>> = realm.query<Task>().asFlow()
            flow.collect { task ->
                Log.v("Task: $task")
            }
        }

        // write an object to the realm in a coroutine
        CoroutineScope(Dispatchers.Main).launch {
            realm.write {
                copyToRealm(Task().apply { name = "my task"; status = "Open"})
            }
        }
        // :code-block-end:
    }

    fun getRandom(): String {
        return Random.nextLong(100000000).toString()
    }

    fun anonymousAuthTest() {
        // :code-block-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
        }
        // :code-block-end:
    }

    fun emailPasswordAuthTest() {
        val email = getRandom()
        val password = getRandom()
        // :code-block-start: email-password-authentication
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // :hide-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :hide-end:
            val user = app.login(Credentials.emailPassword(email, password))
        }
        // :code-block-end:
    }

    fun emailPasswordRegistrationTest() {
        val email = getRandom()
        val password = getRandom()
        // :code-block-start: email-password-registration
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)
            // once registered, you can log in with the user credentials
            val user = app.login(Credentials.emailPassword(email, password))
            Log.v("Successfully logged in ${user.identity}")
        }
        // :code-block-end:
    }

    fun logoutTest() {
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            // :code-block-start: log-out
            user.logOut()
            // :code-block-end:
        }
    }

    fun syncTest() {
        val PARTITION = getRandom()
        // :code-block-start: open-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking() {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :code-block-end:
    }

    fun configureSyncTest() {
        val PARTITION = getRandom()
        // :code-block-start: configure-a-synced-realm
        val app = App.create(YOUR_APP_ID)
        runBlocking() {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, PARTITION)
                // specify name so realm doesn't just use the "default.realm" file for this user
                .name(PARTITION)
                .maxNumberOfActiveVersions(10)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :code-block-end:
    }

    fun initializeAppClientTest() {
        // :code-block-start: initialize-app-client
        val app = App.create(YOUR_APP_ID)
        // :code-block-end:
    }

    fun configureAppClientTest() {
        // :code-block-start: configure-app-client
        App.create(AppConfiguration.Builder(YOUR_APP_ID)
            .log(LogLevel.ALL)
            .build())
        // :code-block-end:
    }
}