package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmDictionaryOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import kotlin.test.Test
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "RealmDictionary_": "",
//       "RealmSet_": ""
//    }
// }

class CreateTest: RealmTest() {

    @Test
    fun createRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, RealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: create-realm-set
            realm.write {
                // Create a Frog object named 'Kermit'
                // Add item to the RealmSet using the add() method
                val frog = copyToRealm(
                    RealmSet_Frog().apply {
                        name = "Kermit"
                        favoriteSnacks.add(RealmSet_Snack().apply { name = "flies" })
                    }
                )
                assertEquals(1, frog.favoriteSnacks.size) // :remove:
                assertEquals("flies", frog.favoriteSnacks.first().name) // :remove:
                println(frog.favoriteSnacks.first().name) // prints "flies"
            }
            // :snippet-end:
            // :snippet-start: add-all-to-realm-set
            realm.write {
                val frog = query<RealmSet_Frog>().find().first()
                val snackSet = frog.favoriteSnacks

                // Create two more RealmSet_Snack objects
                val cricketsSnack = copyToRealm(
                    RealmSet_Snack().apply {
                        name = "crickets"
                    }
                )
                val wormsSnack = copyToRealm(
                    RealmSet_Snack().apply {
                        name = "worms"
                    }
                )

                // Add multiple items to the RealmSet using the addAll() method
                snackSet.addAll(setOf(cricketsSnack, wormsSnack))
                assertEquals(3, snackSet.size) // :remove:
            }
            // :snippet-end:
            realm.writeBlocking {
                val frogs = query<RealmSet_Frog>().find().first()
                delete(frogs)
            }
            realm.close()
        }
    }

    @Test
    fun createRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(RealmDictionary_Frog::class) // Pass the defined class as the object schema
            )
                .inMemory()
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

            // :snippet-start: create-dictionary
            realm.write {
                this.copyToRealm(RealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-end:
            val frogs: RealmResults<RealmDictionary_Frog> = realm.query<RealmDictionary_Frog>().find()
            assertEquals(1, frogs.size)
            val thisFrog = frogs.first()
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            realm.close()
        }
    }

    @Test
    fun createRealmDictionaryPercentEncodedDisallowedCharacter() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(RealmDictionary_Frog::class) // Pass the defined class as the object schema
            )
                .inMemory()
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

            // :snippet-start: percent-encode-disallowed-characters
            // Percent encode . or $ characters to use them in map keys
            val mapKey = "Hundred Acre Wood.Northeast"
            val encodedMapKey = "Hundred Acre Wood%2ENortheast"
            // :snippet-end:

            // Round-trip an object with a percent-encoded map key just to confirm it works
            // Not testing encoding/decoding here because (Dachary) could not figure out how to add java.net as a dependency
            // This functionality seems to be provided by java.net.URLEncoder/URLDecoder
            realm.write {
                this.copyToRealm(RealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf(encodedMapKey to "Picnic Pond")
                })
            }

            val frogs: RealmResults<RealmDictionary_Frog> = realm.query<RealmDictionary_Frog>().find()
            val thisFrog = frogs.first()
            val savedEncodedMapKey = thisFrog.favoritePondsByForest.keys.first()
            assertEquals(encodedMapKey, savedEncodedMapKey)
            realm.close()
        }
    }
}

// :replace-end: