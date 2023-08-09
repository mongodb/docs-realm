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

// :replace-start: {
//    "terms": {
//       "CreateTest_": ""
//    }
// }

// :snippet-start: define-realm-dictionary-property
class CreateTest_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoritePondsByForest: RealmDictionary<String> = realmDictionaryOf()
}
// :snippet-end:

class CreateTest: RealmTest() {
    @Test
    fun createRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(CreateTest_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<CreateTest_Frog> = this.query<CreateTest_Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(frogs)
                assertEquals(0, frogs.size)
            }

            // :snippet-start: create-dictionary
            realm.write {
                this.copyToRealm(CreateTest_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-end:
            val frogs: RealmResults<CreateTest_Frog> = realm.query<CreateTest_Frog>().find()
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
                schema = setOf(CreateTest_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<CreateTest_Frog> = this.query<CreateTest_Frog>().find()
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
                this.copyToRealm(CreateTest_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf(encodedMapKey to "Picnic Pond")
                })
            }

            val frogs: RealmResults<CreateTest_Frog> = realm.query<CreateTest_Frog>().find()
            val thisFrog = frogs.first()
            val savedEncodedMapKey = thisFrog.favoritePondsByForest.keys.first()
            assertEquals(encodedMapKey, savedEncodedMapKey)
            realm.close()
        }
    }
}

// :replace-end: