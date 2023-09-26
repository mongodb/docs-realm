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
** Leaving these here until the Read, Update, and Delete pages are updated
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
    fun createEmbeddedObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Contact::class, EmbeddedAddress::class)
            )
                .build()
            val realm = Realm.open(config)
            realm.write {
                val contact = copyToRealm(Contact())
                contact.apply {
                    name = "Nick Riviera"
                    address = EmbeddedAddress().apply {
                        street = "123 Fake St"
                        city = "Some Town"
                        state = "MA"
                        postalCode = "12345"
                    }
                }
            }

            val asyncCall: Deferred<Unit> = async {
                val address: EmbeddedAddress = realm.query<EmbeddedAddress>().find().first()
                val contact: Contact = realm.query<Contact>().find().first()
                // :snippet-start: update-embedded-object
                // Modify embedded object properties in a write transaction
                realm.write {
                    // Fetch the objects
                    val addressToUpdate = findLatest(address)?: error("Cannot find latest version of embedded object")
                    val contactToUpdate = findLatest(contact)?: error("Cannot find latest version of parent object")

                    // Update a single embedded object property directly
                    addressToUpdate.street = "100 10th St N"

                    // Update multiple properties
                    addressToUpdate.apply {
                        street = "202 Coconut Court"
                        city = "Los Angeles"
                        state = "CA"
                        postalCode = "90210"
                    }

                    // Update property through the parent object
                    contactToUpdate.address?.state = "NY"
                }
                // :snippet-end:

                // :snippet-start: overwrite-embedded-object
                // Overwrite the embedded object in a write transaction
                realm.write {
                    // Fetch the parent object
                    val parentObject: Contact =
                        realm.query<Contact>("name == 'Nick Riviera'").find().first()

                    // Overwrite the embedded object (deletes the existing object)
                    parentObject.address = EmbeddedAddress().apply {
                        street = "202 Coconut Court"
                        city = "Los Angeles"
                        state = "CA"
                        postalCode = "90210"
                    }
                }
                // :snippet-end:

            }
            asyncCall.cancel()
            realm.close()
            Realm.deleteRealm(config)
        }
    }

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

    @Test
    fun deleteEmbeddedObject() {
        val realmName = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Contact::class, EmbeddedAddress::class))
                .name(realmName)
                .build()
            val realm = Realm.open(config)

            realm.write {
                val contact1 = copyToRealm(Contact())
                contact1.apply {
                    name = "Marvin Monroe"
                    address = EmbeddedAddress().apply {
                        street = "123 Fake St"
                        city = "Some Town"
                        state = "MA"
                        postalCode = "12345"
                    }
                }
                val contact2 = copyToRealm(Contact())
                contact2.apply {
                    name = "Nick Riviera"
                    address = EmbeddedAddress().apply {
                        street = "999 Imaginary Blvd"
                        city = "Some Town"
                        state = "FL"
                        postalCode = "55555"
                    }
                }
            }

            // :snippet-start: delete-embedded-object
            //  Delete an embedded object directly
            realm.write {
                val addressToDelete: EmbeddedAddress =
                    this.query<EmbeddedAddress>("street == '123 Fake St'").find().first()

                // Delete the embedded object (nullifies the parent property)
                delete(addressToDelete)
            }

            // Delete an embedded object through the parent
            realm.write {
                val propertyToClear: Contact =
                    this.query<Contact>("name == 'Nick Riviera'").find().first()

                // Clear the parent property (deletes the embedded object instance)
                propertyToClear.address = null
            }

            // Delete parent object (deletes all embedded objects)
            realm.write {
                val contactToDelete: Contact =
                    this.query<Contact>("name == 'Nick Riviera'").find().first()
                delete(contactToDelete)
            }
            // :snippet-end:

            assertEquals(0, realm.query<EmbeddedAddress>().find().size)
            assertEquals(0, realm.query<Contact>("name == 'Nick Riviera'").find().size)

            realm.close()
            Realm.deleteRealm(config)
        }
    }
}