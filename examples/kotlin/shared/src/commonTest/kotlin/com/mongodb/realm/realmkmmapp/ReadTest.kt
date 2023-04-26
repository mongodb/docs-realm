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
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "ReadTest_": ""
//    }
// }

class ReadTest_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoritePondsByForest: RealmDictionary<String> = realmDictionaryOf()
}

class ReadTest: RealmTest() {
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
            val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > 1").find()
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
}

// :replace-end: