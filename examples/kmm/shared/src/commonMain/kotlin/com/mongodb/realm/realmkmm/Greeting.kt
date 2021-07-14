package com.mongodb.realm.realmkmm

import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmResults
import io.realm.delete
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class Greeting {
    fun greeting(): String {
        getDogs()
        query()
        update()
        quickStart()
        changeListeners()
        return "Hello, ${Platform().platform}!"
    }

    fun getDogs(): String {
        val configuration = RealmConfiguration(schema = setOf(Person::class, Dog::class))
        val realm = Realm(configuration)

        // plain old kotlin object
        val person = Person().apply {
            name = "Carlo"
            dog = Dog().apply { name = "Fido"; age = 16 }
        }

        // persist it in a transaction
        realm.writeBlocking {
            val managedPerson = this.copyToRealm(person)
        }

        // All Persons
        val all = realm.objects<Person>()

        // Person named 'Carlo'
        val filteredByName = realm.objects<Person>().query("name = $0", "Carlo")

        // Person having a dog aged more than 7 with a name starting with 'Fi'
        val filteredByDog = realm.objects<Person>().query("dog.age > $0 AND dog.name BEGINSWITH $1", 7, "Fi")

        // Find the first Person without a dog
        realm.objects<Person>().query("dog == NULL LIMIT(1)")
            .firstOrNull()
            ?.also { personWithoutDog ->
                // Add a dog in a transaction
                realm.writeBlocking {
                    personWithoutDog.dog = Dog().apply { name = "Laika"; age = 3 }
                }
            }

        // delete all Dogs
        realm.writeBlocking {
            realm.objects<Dog>().delete()
        }

        return ""
    }

    fun query() {
        // :code-block-start: landing-page-query
        val config = RealmConfiguration(schema = setOf(Frog::class))
        val realm = Realm(config)
        val frogsQuery = realm.objects<Frog>()
        val numTadpoles = frogsQuery.query("age > $0", 2).count()
        print("Tadpoles: $numTadpoles")
        val numFrogsNamedJasonFunderburker = frogsQuery.query("name == $0", "Jason Funderburker").count()
        print("Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")
        val numFrogsWithoutOwners = frogsQuery.query("owner == null").count()
        print("Frogs without owners: $numFrogsWithoutOwners")
        // :code-block-end:
    }

    fun update() {
        val configSetup = RealmConfiguration(schema = setOf(Frog::class))
        val realmSetup = Realm(configSetup)
        realmSetup.writeBlocking {
            this.copyToRealm(Frog().apply {
                name = "Benjamin Franklin"
                age = 12
                species = "bullfrog"
                owner = null
            })
        }
        // :code-block-start: landing-page-update
        val config = RealmConfiguration(schema = setOf(Frog::class))
        val realm = Realm(config)
        // start a write transaction
        realm.writeBlocking {
            // get a frog from the database to update
            val frog = this.objects<Frog>()
                .query("name == $0 LIMIT(1)", "Benjamin Franklin")
            // change the frog's name
            frog[0].name = "George Washington"
            // change the frog's species
            frog[0].species = "American bullfrog"
        } // when the transaction completes, the frog's name and species
        // are updated in the database
        // :code-block-end:
    }

    fun quickStart() {
        // :code-block-start: quick-start
        // :code-block-start: quick-start-open-a-realm
        val config = RealmConfiguration(schema = setOf(Task::class))
        val realm = Realm(config)
        // :code-block-end:
        // :code-block-start: quick-start-create
        realm.writeBlocking {
            this.copyToRealm(Task().apply {
                name = "Do work"
                status = "Open"
            })
        }
        // :code-block-end:
        // :code-block-start: quick-start-read
        // all tasks in the realm
        val tasks = realm.objects<Task>().query()
        // :code-block-end:
        // :code-block-start: quick-start-read-filtered
        // all tasks in the realm
        val tasksThatBeginWIthD = realm.objects<Task>().query("name BEGINSWITH $0'", "D")
        val openTasks = realm.objects<Task>().query("status == $0", "Open")
        // :code-block-end:
        // :code-block-start: quick-start-update
        realm.writeBlocking {
            openTasks[0].status = "In Progress"
        }
        // :code-block-end:
        // :code-block-start: quick-start-delete
        realm.writeBlocking {
            tasks[0].delete()
        }
        // :code-block-end:
        // :code-block-end:
    }

    fun changeListeners() {
        // :code-block-start: change-listeners
        val config = RealmConfiguration(schema = setOf(Task::class))
        val realm = Realm(config)

        // fetch objects from a realm as Flowables
        CoroutineScope(Dispatchers.Main).launch {
            val flow: Flow<RealmResults<Task>> = realm.objects(Task::class).observe()
            flow.collect { task ->
                println("Task: $task")
            }
        }

        // write an object to the realm in a coroutine
        CoroutineScope(Dispatchers.Main).launch {
            realm.write {
                this.copyToRealm(Task().apply { name = "my task"; status = "Open"})
            }
        }
        // :code-block-end:
    }
}