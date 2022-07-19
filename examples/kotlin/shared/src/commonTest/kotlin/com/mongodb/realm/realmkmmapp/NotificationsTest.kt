package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.DeletedList
import io.realm.kotlin.notifications.DeletedObject
import io.realm.kotlin.notifications.ListChange
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.notifications.SingleQueryChange
import io.realm.kotlin.notifications.UpdatedList
import io.realm.kotlin.notifications.UpdatedObject
import io.realm.kotlin.notifications.UpdatedResults
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class NotificationsTest: RealmTest() {
    // :snippet-start: sample-data-models
    class Character(): RealmObject {
        @PrimaryKey
        var name: String = ""
        var species: String = ""
        var age: Int = 0
        constructor(name: String, species: String, age: Int) : this() {
            this.name = name
            this.species = species
            this.age = age
        }
    }
    class Fellowship() : RealmObject {
        @PrimaryKey
        var name: String = ""
        var members: RealmList<Character> = realmListOf()
        constructor(name: String, members: RealmList<Character>) : this() {
            this.name = name
            this.members = members
        }
    }
    // :snippet-end:

    fun seedSampleData(realmName: String) {
        runBlocking {
            // :snippet-start: sample-data-seed
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/") // :remove:
                .name(realmName)
                .build()
            val realm = Realm.open(config)

            val frodo = Character("Frodo", "Hobbit", 51)
            val samwise = Character("Samwise", "Hobbit", 39)
            val aragorn = Character("Aragorn", "Dúnedain", 87)
            val legolas = Character("Legolas", "Elf", 2931)
            val gimli = Character("Gimli", "Dwarf", 140)
            val gollum = Character("Gollum", "Hobbit", 589)

            val fellowshipOfTheRing = Fellowship(
                "Fellowship of the Ring",
                realmListOf(frodo, samwise, aragorn, legolas, gimli))

            realm.writeBlocking{
                this.copyToRealm(fellowshipOfTheRing)
                this.copyToRealm(gollum) // not in fellowship
            }

            realm.close()
            // :snippet-end:
        }
    }

    @Test
    fun queryChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/") // default location for jvm is... in the project root
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: query-change-listener
            // Listen for changes on whole collection
            val characters = realm.query(Character::class)

            // flow.collect() is blocking -- run it in a background context
            CoroutineScope(Dispatchers.Unconfined).launch {
                // create a Flow from that collection, then add a listener to the Flow
                val charactersFlow = characters.asFlow()
                val subscription = charactersFlow.collect { changes: ResultsChange<Character> ->
                    when (changes) {
                        // UpdatedResults means this change represents an update/insert/delete operation
                        is UpdatedResults -> {
                            changes.insertions // indexes of inserted objects
                            changes.insertionRanges // ranges of inserted objects
                            changes.changes // indexes of modified objects
                            changes.changeRanges // ranges of modified objects
                            changes.deletions // indexes of deleted objects
                            changes.deletionRanges // ranges of deleted objects
                            changes.list // the full collection of objects
                        }
                        else -> {
                            // types other than UpdatedResults are not changes -- ignore them
                        }
                    }
                }
            }
            // Listen for changes on RealmResults
            val hobbits = realm.query(Character::class, "species == 'Hobbit'")
            CoroutineScope(Dispatchers.Unconfined).launch {
                val hobbitsFlow = hobbits.asFlow()
                val hobbitsSubscription = hobbitsFlow.collect { changes: ResultsChange<Character> ->
                    // ... all the same data as above
                }
            }
            // :snippet-end:

            realm.close()
        }
    }

    @Test
    fun realmObjectChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: realm-object-change-listener
            // query for the specific object you intend to listen to
            val frodo = realm.query(Character::class, "name == 'Frodo'").first()
            // flow.collect() is blocking -- run it in a background context
            CoroutineScope(Dispatchers.Unconfined).launch {
                val frodoFlow = frodo.asFlow()
                frodoFlow.collect { changes: SingleQueryChange<Character> ->
                    when (changes) {
                        is UpdatedObject -> {
                            changes.changedFields // the changed properties
                            changes.obj // the object in its newest state
                            changes.isFieldChanged("name") // check if a specific field changed in value
                        }
                        is DeletedObject -> {
                            // if the object has been deleted
                            changes.obj // returns null for deleted objects -- always reflects newest state
                        }
                    }
                }
            }
            // :snippet-end:

            realm.close()
        }
    }

    @Test
    fun realmListChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: realm-list-change-listener
            // query for the specific object you intend to listen to
            val fellowshipOfTheRing = realm.query(Fellowship::class, "name == 'Fellowship of the Ring'").first().find()!!
            val members = fellowshipOfTheRing.members
            // flow.collect() is blocking -- run it in a background context
            CoroutineScope(Dispatchers.Unconfined).launch {
                val membersFlow = members.asFlow()
                membersFlow.collect { changes: ListChange<Character> ->
                    when (changes) {
                        is UpdatedList -> {
                            changes.insertions // indexes of inserted objects
                            changes.insertionRanges // ranges of inserted objects
                            changes.changes // indexes of modified objects
                            changes.changeRanges // ranges of modified objects
                            changes.deletions // indexes of deleted objects
                            changes.deletionRanges // ranges of deleted objects
                            changes.list // the full collection of objects
                        }
                        is DeletedList -> {
                            // if the list was deleted
                        }
                    }
                }
            }
            // :snippet-end:

            realm.close()
        }
    }
}