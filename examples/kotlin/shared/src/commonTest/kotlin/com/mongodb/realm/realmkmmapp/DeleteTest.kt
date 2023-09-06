package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmDictionaryOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmDictionary
import io.realm.kotlin.types.RealmObject
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "UpdateTest_": "",
//       "RealmSet_": ""
//    }
// }

class DeleteTest_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoritePondsByForest: RealmDictionary<String?> = realmDictionaryOf()
}

class DeleteTest: RealmTest() {

    @Test
    fun deleteRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write { copyToRealm(
                RealmSet_Frog().apply {
                    name = "Kermit"
                    favoriteSnacks.add(Snack().apply { name = "Flies" })
                    favoriteSnacks.add(Snack().apply { name = "Crickets" })
                    favoriteSnacks.add(Snack().apply { name = "Worms" })
                })
            }
            // :snippet-start: remove-item-from-set
            realm.write {
                val myFrog = realm.query<RealmSet_Frog>("name == $0", "Kermit").find().first()
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
            }
            // :snippet-end:
            realm.write {
                val myFrog = realm.query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = findLatest(myFrog)!!.favoriteSnacks
                val snack1 = this.copyToRealm(Snack().apply {
                    name = "snack1"
                })
                val snack2 = this.copyToRealm(Snack().apply {
                    name = "snack2"
                })
                val snack3 = this.copyToRealm(Snack().apply {
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
                schema = setOf(DeleteTest_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<DeleteTest_Frog> = this.query<DeleteTest_Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(frogs)
                assertEquals(0, frogs.size)
            }

            // Create an object with a dictionary property to set up the test
            realm.write {
                this.copyToRealm(DeleteTest_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-start: delete-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val frogs = realm.query<DeleteTest_Frog>().find()
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
            val thisFrogUpdated = realm.query<DeleteTest_Frog>().find().first()
            assertFalse(thisFrogUpdated.favoritePondsByForest.containsKey("Lothlorien"))
            assertTrue(thisFrogUpdated.favoritePondsByForest.containsKey("Hundred Acre Wood"))
            assertFalse(thisFrogUpdated.favoritePondsByForest.containsValue("Picnic Pond"))
            realm.close()
        }
    }
}

// :replace-end:
