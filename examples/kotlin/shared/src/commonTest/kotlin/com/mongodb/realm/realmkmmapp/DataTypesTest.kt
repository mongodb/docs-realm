package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.parent
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.EmbeddedRealmObject
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals


/*
** Leaving these here until the Read and Update pages are updated
* to use the new object model and this page can be deleted
*
* See the Schema.kt file for the new object model and CreateTest.kt for new tested Create snippets
 */

class EmbeddedAddress : EmbeddedRealmObject {
    var street: String? = null
    var city: String? = null
    var state: String? = null
    var postalCode: String? = null
}

class Contact : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var address: EmbeddedAddress? = null
}

class DataTypesTest : RealmTest() {

    @Test
    fun queryEmbeddedObject() {
        val realmName = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Contact::class, EmbeddedAddress::class))
                .name(realmName)
                .build()
            val realm = Realm.open(config)

            realm.write {
                val contact = copyToRealm(Contact())
                contact.apply {
                    name = "Nick Riviera"
                    address = EmbeddedAddress().apply {
                        street = "999 Imaginary Blvd"
                        city = "Some Town"
                        state = "FL"
                        postalCode = "55555"
                    }
                }
            }

            // :snippet-start: query-embedded-objects
            // Query an embedded object directly
            val queryAddress: EmbeddedAddress =
                realm.query<EmbeddedAddress>("state == 'FL'").find().first()

            // Get the parent of an embedded object
            val getParent: Contact =
                queryAddress.parent()

            // Query through the parent object
            val queryContactAddresses: RealmResults<Contact> =
                realm.query<Contact>("address.state == 'NY'")
                    .sort("name")
                    .find()
            // :snippet-end:

            realm.close()
            Realm.deleteRealm(config)
        }
    }
}

