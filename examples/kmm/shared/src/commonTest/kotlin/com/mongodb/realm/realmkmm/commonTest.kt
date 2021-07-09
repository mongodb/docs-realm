package com.mongodb.realm.realmkmm

import io.realm.Realm
import io.realm.RealmConfiguration
import kotlin.test.Test
import kotlin.test.assertTrue

class CommonGreetingTest {

    @Test
    fun testExample() {
        assertTrue(Greeting().greeting().contains("Hello"), "Check 'Hello' is mentioned")
    }

    @Test
    fun query() {
        // :code-block-start: landing-page-query
        val config = RealmConfiguration(schema = setOf(Frog::class))
        val realm = Realm.open(config)
        val frogsQuery = realm.objects<Frog>()
        val numTadpoles = frogsQuery.query("age > $0", 2).count()
        print("Tadpoles: $numTadpoles")
        val numFrogsNamedJasonFunderburker = frogsQuery.query("name == $0", "Jason Funderburker").count()
        print("Frogs named Jason Funderburker: $numFrogsNamedJasonFunderburker")
        val numFrogsWithoutOwners = frogsQuery.query("owner == null").count()
        print("Frogs without owners: $numFrogsWithoutOwners")
        // :code-block-end:
        assertTrue(true) // reached end of test successfully
    }

    @Test
    fun update() {
        val configSetup = RealmConfiguration(schema = setOf(Frog::class))
        val realmSetup = Realm.open(configSetup)
        realmSetup.writeBlocking {
            this.copyToRealm(Frog().apply {
                name = "Benjamin Franklin";
                age = 12
                species = "bullfrog"
                owner = null
            })
        }
        // :code-block-start: landing-page-update
        val config = RealmConfiguration(schema = setOf(Frog::class))
        val realm = Realm.open(config)
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
        assertTrue(true) // reached end of test successfully
    }

    @Test
    fun quickStart() {
        // :code-block-start: quickstart
        val configuration = RealmConfiguration(schema = setOf(Person::class, Dog::class))
        val realm = Realm.open(configuration)

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
        // :code-block-end:
        assertTrue(true) // reached end of test successfully
    }
}