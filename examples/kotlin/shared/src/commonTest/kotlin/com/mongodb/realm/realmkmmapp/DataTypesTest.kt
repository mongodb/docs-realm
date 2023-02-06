package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.parent
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.EmbeddedRealmObject
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals

// :snippet-start: embedded-object-model
// Define an embedded object
class Address() : EmbeddedRealmObject {
    var street: String? = null
    var city: String? = null
    var state: String? = null
    var postalCode: String? = null
}

// Define an object containing one embedded object
class Contact : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""

    // Embed a single object (must be optional)
    var address: Address? = null
}

// Define an object containing an array of embedded objects
class Business : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""

    // Embed an array of objects (cannot be null)
    var addresses: RealmList<Address> = realmListOf()
}
// :snippet-end:
class DataTypesTest : RealmTest() {
    @Test
    fun createEmbeddedObject() {
        runBlocking {
            // :snippet-start: open-realm-embedded-object
            // Include parent and embedded object classes in schema
            val config = RealmConfiguration.Builder(
                setOf(Contact::class, Address::class)
            )
                .build()
            val realm = Realm.open(config)
            // :snippet-end:

            // :snippet-start: create-embedded-object
            val nickRiviera = Contact()
            val nicksAddress = Address()

            // Create a parent object with one embedded address
            realm.write {
                this.copyToRealm(
                    nickRiviera.apply {
                        name = "Nick Riviera"

                        // Embed the address in the contact object
                        address = nicksAddress.apply {
                            street = "123 Fake St"
                            city = "Some Town"
                            state = "MA"
                            postalCode = "12345"
                        }
                    })
            }
            // :snippet-end:

            // :snippet-start: update-embedded-object
            // ... Fetch the object

            // Modify the property of the embedded object in a write transaction
            realm.write {

                // Update the embedded object property directly
                nicksAddress.street = "100 10th St N"

                // Update property through the parent object
                nickRiviera.address?.state = "NY"
            }
            // :snippet-end:

            // :snippet-start: overwrite-embedded-object
            // ... Fetch the object

            // Overwrite the embedded object (deletes the original object)
            realm.write {
                nicksAddress.apply {
                    street = "202 Coconut Court"
                    city = "Los Angeles"
                    state = "CA"
                    postalCode = "90210"
                }
            }
            // :snippet-end:

            realm.close()
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun deleteEmbeddedObject() {
        val realmName = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Contact::class, Address::class))
                .name(realmName)
                .build()
            val realm = Realm.open(config)

            val nickRiviera = Contact()
            val nicksAddress = Address()

            realm.write {
                this.copyToRealm(
                    nickRiviera.apply {
                        name = "Nick Riviera"
                        address = nicksAddress.apply {
                            street = "123 Fake St"
                            city = "Some Town"
                            state = "MA"
                            postalCode = "12345"
                        }
                    })
            }

            // :snippet-start: query-embedded-objects
            // Query through the parent object
            val queryContactAddresses: RealmResults<Contact> =
                realm.query<Contact>("address.state == 'NY'")
                    .sort("name")
                    .find()

            // Query an embedded object directly
            val queryAddress: Address =
                realm.query<Address>("state == 'MA'").find().first()

            // Get the parent of an embedded object
            val getParent: Contact =
                queryAddress.parent()
            // :snippet-end:

            // :snippet-start: delete-embedded-object
            //  Delete an embedded object directly from parent
            realm.write {
                val addressToDelete: Address =
                    this.query<Address>("street == '123 Fake St'").find().first()
                delete(addressToDelete)
            }

            // Delete parent object (deletes all embedded objects)
            realm.write {
                val contactToDelete: Contact =
                    this.query<Contact>("name == 'Nick Riviera'").find().first()
                delete(contactToDelete)
            }
            // :snippet-end:

            assertEquals(0, realm.query<Address>().find().size)
            assertEquals(0, realm.query<Contact>().find().size)

            realm.close()
            Realm.deleteRealm(config)
        }
    }
}