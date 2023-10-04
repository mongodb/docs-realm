package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "ExampleRealmObject_": "",
//       "ExampleRelationship_": "",
//       "ExampleEmbeddedRelationship_": "",
//       "RealmDictionary_": "",
//       "RealmSet_": ""
//    }
// }


class DeleteTest: RealmTest() {

    @Test
    fun fetchLatestToDeleteObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    species = "tree frog"
                    age = 12
                })
            }
            // :snippet-start: fetch-latest-to-delete-object
            // Frog object is outside of the write transaction, so it is frozen
            val frozenFrog = realm.query<ExampleRealmObject_Frog>("name == $0", "Kermit").find().first()
            assertTrue(frozenFrog.isFrozen())

            // Open a write transaction
            realm.writeBlocking {
                // Get the live frog object with findLatest() to delete it
                findLatest(frozenFrog)?.let { liveFrog ->
                    delete(liveFrog)
                }
            }
            // :snippet-end:
            assertEquals(0, realm.query<ExampleRealmObject_Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun deleteRealmObjects() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                    species = "tree frog"
                    age = 12
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Froggy"
                    age = 2
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Mr. Toad"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Mr. Frog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Michigan J. Frog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Big BullFrog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Another Frog"
                    age = 1
                })
                assertEquals(7, query<ExampleRealmObject_Frog>().find().size)
                assertEquals(6, query<ExampleRealmObject_Frog>("species == 'bullfrog'").find().size)
            }
            // :snippet-start: delete-one-realm-object
            // Open a write transaction
            realm.write {
                // Query the Frog type and filter by primary key value
                val frogToDelete: ExampleRealmObject_Frog = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(PRIMARY_KEY_VALUE, frogToDelete._id) // :remove:
                // Pass the query results to delete()
                delete(frogToDelete)
                assertFalse(frogToDelete.isValid())
                assertTrue(query<ExampleRealmObject_Frog>().find().size == 6) // :remove:
            }
            // :snippet-end:
            // :snippet-start: delete-multiple-realm-objects
            // Open a write transaction
            realm.write {
                // Query by species and limit to 3 results
                val bullfrogsToDelete: RealmResults<ExampleRealmObject_Frog> = query<ExampleRealmObject_Frog>("species == 'bullfrog' LIMIT(3)").find()
                // Pass the query results to delete()
                delete(bullfrogsToDelete)
                assertTrue(query<ExampleRealmObject_Frog>("species == 'bullfrog'").find().size == 3) // :remove:
            }
            // :snippet-end:
            // :snippet-start: delete-all-realm-objects
            // Open a write transaction
            realm.write {
                // Query Frog type with no filter to return all frog objects
                val frogsLeftInTheRealm = query<ExampleRealmObject_Frog>().find()
                delete(frogsLeftInTheRealm)
                assertTrue(frogsLeftInTheRealm.size == 0)
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmObjectWithRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                    age = 12
                    favoritePond = ExampleRelationship_Pond().apply { name = "Picnic Pond" }
                })
            }
            // :snippet-start: delete-realm-object-with-related-objects
            // Open a write transaction
            realm.write {
                // Query for the parent frog object
                val frogWithAPond = query<ExampleRelationship_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(PRIMARY_KEY_VALUE, frogWithAPond._id) // :remove:
                // Confirm pond is available through the favoritePond property
                assertEquals("Picnic Pond", frogWithAPond.favoritePond?.name)

                // Delete the frog
                delete(frogWithAPond)
                assertFalse(frogWithAPond.isValid())

                // Confirm the pond is still in the realm
                val pondsLeftInTheRealm = query<ExampleRelationship_Pond>().find()
                assertEquals("Picnic Pond", pondsLeftInTheRealm.first().name)
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmList() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Forest::class, ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Hundred Acre Wood"
                    nearbyPonds.addAll(realmListOf(
                        ExampleRelationship_Pond().apply { name = "Frog Corner" },
                        ExampleRelationship_Pond().apply { name = "The Pond" },
                        ExampleRelationship_Pond().apply { name = "Enchanted Pool" },
                        ExampleRelationship_Pond().apply { name = "Bubbling Spring" },
                        ExampleRelationship_Pond().apply { name = "Big Spring" }
                    ))
                })
            }
            // :snippet-start: remove-items-from-list
            // Open a write transaction
            realm.write {
                // Query for the parent forest object
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                val forestPonds = forest.nearbyPonds
                assertEquals(5, forestPonds.size)

                // Remove the first pond in the list
                val removeFirstPond = forestPonds.first()
                forestPonds.remove(removeFirstPond)
                assertEquals(4, forestPonds.size)

                // Remove the pond at index 2 in the list
                forestPonds.removeAt(2)
                assertEquals(3, forestPonds.size)

                // Remove the remaining three ponds in the list
                forestPonds.removeAll(forestPonds)
                assertEquals(0, forestPonds.size)
            }
            // :snippet-end:
            realm.write {
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                forest.nearbyPonds.addAll(realmListOf(
                    ExampleRelationship_Pond().apply { name = "Frog Corner" },
                    ExampleRelationship_Pond().apply { name = "The Pond" },
                    ExampleRelationship_Pond().apply { name = "Enchanted Pool" },
                    ExampleRelationship_Pond().apply { name = "Bubbling Spring" },
                    ExampleRelationship_Pond().apply { name = "Big Spring" }
                ))
            }
            // :snippet-start: list-clear
            // Open a write transaction
            realm.write {
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                val forestPonds = forest.nearbyPonds
                assertEquals(5, forestPonds.size)

                // Clear all ponds from the list
                forestPonds.clear()
                assertEquals(0, forestPonds.size)
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, RealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write { copyToRealm(
                RealmSet_Frog().apply {
                    name = "Kermit"
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Flies" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Crickets" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Worms" })
                })
            }
            // :snippet-start: remove-item-from-set
            realm.write {
                val myFrog = query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = findLatest(myFrog)!!.favoriteSnacks

                // Remove the Flies snack from the set
                val fliesSnack = snackSet.first { it.name == "Flies" }
                snackSet.remove(fliesSnack)
                assertFalse(snackSet.contains(fliesSnack)) // :remove:

                // Remove all snacks from the set
                val allSnacks = findLatest(myFrog)!!.favoriteSnacks
                snackSet.removeAll(allSnacks)
                // :remove-start:
                // TODO update test once https://github.com/realm/realm-kotlin/issues/1097 is fixed in v1.11.0
                // assertTrue(set.isEmpty())
                snackSet.removeAll(allSnacks) // have to call twice to actually remove all items until bug is fixed
                // :remove-end:
                val snacks = query<RealmSet_Snack>().find()
                Log.v("There are ${snacks.size} snacks left in the realm")
            }
            // :snippet-end:
            realm.write {
                val myFrog = realm.query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = findLatest(myFrog)!!.favoriteSnacks
                val snack1 = this.copyToRealm(RealmSet_Snack().apply {
                    name = "snack1"
                })
                val snack2 = this.copyToRealm(RealmSet_Snack().apply {
                    name = "snack2"
                })
                val snack3 = this.copyToRealm(RealmSet_Snack().apply {
                    name = "snack3"
                })

                snackSet.addAll(setOf(snack1, snack2, snack3))
                assertEquals(3, snackSet.size)

                // :snippet-start: clear-set
                // Clear all snacks from the set
                snackSet.clear()
                // :snippet-end:
                 assertTrue(snackSet.isEmpty())
            }
            realm.close()
        }
    }

    @Test
    fun deleteRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(RealmDictionary_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<RealmDictionary_Frog> = this.query<RealmDictionary_Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(frogs)
                assertEquals(0, frogs.size)
            }

            // Create an object with a dictionary property to set up the test
            realm.write {
                this.copyToRealm(RealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-start: delete-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val frogs = realm.query<RealmDictionary_Frog>().find()
            val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > 1").find()
            val thisFrog = frogsWithFavoritePonds.first()
            // :remove-start:
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood"))
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Lothlorien"))
            // :remove-end:
            // Set an optional value for a key to null if the key exists
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                realm.write {
                    val mutableFrog = findLatest(thisFrog)
                    if (mutableFrog != null) {
                        mutableFrog.favoritePondsByForest["Hundred Acre Wood"] = null
                    }
                }
            }
            // Remove a key and its value
            realm.write {
                findLatest(thisFrog)?.favoritePondsByForest?.remove("Lothlorien")
            }
            // :snippet-end:
            val thisFrogUpdated = realm.query<RealmDictionary_Frog>().find().first()
            assertFalse(thisFrogUpdated.favoritePondsByForest.containsKey("Lothlorien"))
            assertTrue(thisFrogUpdated.favoritePondsByForest.containsKey("Hundred Acre Wood"))
            assertFalse(thisFrogUpdated.favoritePondsByForest.containsValue("Picnic Pond"))
            realm.close()
        }
    }
}

// :replace-end:
