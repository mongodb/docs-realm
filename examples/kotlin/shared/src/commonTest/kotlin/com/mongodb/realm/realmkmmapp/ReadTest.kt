package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmDictionaryOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmDictionary
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.FullText
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "ReadTest_": "",
//       "RealmSet_": ""
//    }
// }

class ReadTest_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoritePondsByForest: RealmDictionary<String> = realmDictionaryOf()
}

class ReadTest: RealmTest() {

    @Test
    fun readRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: read-realm-set
            realm.write {
                // Create a Frog object named 'Kermit'
                // with a RealmSet of favorite snacks
                val frog = copyToRealm(
                    RealmSet_Frog().apply {
                        name = "Kermit"
                        favoriteSnacks.add(Snack().apply { name = "Flies" })
                        favoriteSnacks.add(Snack().apply { name = "Crickets" })
                        favoriteSnacks.add(Snack().apply { name = "Worms" })
                    }
                )
                // Query for frogs that have worms as a favorite snack
                val frogs = query<RealmSet_Frog>("favoriteSnacks.name == $0", "Worms").find().first()
                assertEquals("Kermit", frogs.name) // :remove:

                // Query for specific snacks
                val wormsSnack = frog.favoriteSnacks.first { it.name == "Worms" }
                assertNotNull(wormsSnack) // :remove:
            }
            // :snippet-end:
            realm.write {
                // :snippet-start: realm-set-contains
                val frog = query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = findLatest(frog)?.favoriteSnacks

                // Check if the set contains a particular value
                val wormSnack = snackSet?.first { it.name == "Worms" }
                Log.v("Does Kermit eat worms?: ${snackSet?.contains(wormSnack)}") // true

                // Check if the set contains multiple values
                val containsAllSnacks = snackSet?.containsAll(snackSet)
                Log.v("Does Kermit eat flies, crickets, and worms?: $containsAllSnacks") // true
                // :snippet-end:
                assertTrue(snackSet?.contains(wormSnack)?: false)
                assertTrue(containsAllSnacks?: false)
            }
            realm.writeBlocking {
                val frogs = query<RealmSet_Frog>().find().first()
                delete(frogs)
            }
            realm.close()
        }
    }

    @Test
    fun readRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(ReadTest_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<ReadTest_Frog> = this.query<ReadTest_Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(frogs)
                assertEquals(0, frogs.size)
            }

            // Create an object with a dictionary property to set up the test
            realm.write {
                this.copyToRealm(ReadTest_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-start: read-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val frogs = realm.query<ReadTest_Frog>().find()
            val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > $0", 1).find()
            val thisFrog = frogsWithFavoritePonds.first()
            assertEquals(2, thisFrog.favoritePondsByForest.size) // :remove:
            Log.v("${thisFrog.name} has favorite ponds in these forests: ")
            // You can iterate through keys or values
            for (key in thisFrog.favoritePondsByForest.keys) Log.v(key)
            // Check if a dictionary contains a key
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) // :remove:
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
            }
            // Check if a dictionary contains a value
            assertTrue(thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) // :remove:
            if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
                Log.v("${thisFrog.name}'s lists Picnic Pond as a favorite pond")
            }
            // :snippet-end:
            realm.close()
        }
    }
    // :replace-end:

    @Test
    fun fullTextSearch () {
        // :snippet-start: kotlin-fts-property
        class Book : RealmObject {
            var name: String = ""
            @FullText // Marks the property with FTS
            var genre: String = ""
        }
        // :snippet-end:

        val config = RealmConfiguration.Builder(setOf(Book::class))
            .inMemory()
            .build()
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")

        runBlocking {
            realm.writeBlocking {
                copyToRealm(Book().apply {
                    genre = "sci fi"
                })
                copyToRealm(Book().apply {
                    genre = "fiction"
                })
                copyToRealm(Book().apply {
                    genre = "science fiction"
                })
                copyToRealm(Book().apply {
                    genre = "sci fi fantasy"
                }) }

            // :snippet-start: kotlin-fts-query
            // Find all books with "science fiction" as the genre
            val scienceFiction =
                realm.query<Book>("genre TEXT $0", "science fiction").find()

            // Find all books with "fiction" but not "science" in the genre
            val fictionNotScience =
                realm.query<Book>("genre TEXT $0", "fiction -science").find()

            // Find all books with "sci-" and "fi-" prefixes in the genre
            val sciFi =
                realm.query<Book>("genre TEXT $0", "sci* fi*").find()
            // :snippet-end:

            assertEquals(1, scienceFiction.size) // "science fiction"
            assertEquals(1, fictionNotScience.size) // "fiction"
            assertEquals(3, sciFi.size) // "sci fi", "science fiction", "sci fi fantasy"

            realm.writeBlocking {
                val books = query<Book>().find()
                delete(books)
            }
        }
        realm.close()
    }
}
