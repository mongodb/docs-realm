package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.MutableRealm
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.EmbeddedRealmObject
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import org.mongodb.kbson.ObjectId
import kotlin.test.Test

// :snippet-start: embedded-object-model
// Define an embedded object
class Address(
    var street: String? = null,
    var city: String? = null,
    var state: String? = null,
    var postalCode: String? = null
) : EmbeddedRealmObject {
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
class DataTypesTest {
    @Test
    fun createEmbeddedObject() {
        runBlocking {
            // :snippet-start: create-embedded-object
            // Include parent and embedded objects in schema
            val config = RealmConfiguration.Builder(
                setOf(Contact::class, Business::class, Address::class)
            )
                .build()
            val realm = Realm.open(config)

                // Create a parent object with one embedded address
                realm.write {
                    val contact = this.copyToRealm(Contact().apply {
                        name = "Nick Riviera"

                        // Embed the address in the contact object
                        address = Address().apply {
                            street = "123 Fake St"
                            city = "Some Town"
                            state = "MA"
                            postalCode = "12345"
                        }
                    })

                    // Create a parent object with an array of embedded addresses
                    val business = this.copyToRealm(Business().apply {
                        name = "Hollywood Upstairs Medical College"

                        // Embed the addresses in the business object
                        addresses = realmListOf<Address>().apply {
                            val mainAddress = Address().apply {
                                street = "555 Park Ave"
                                city = "New York"
                                state = "NY"
                                postalCode = "55510"
                            }
                            val secondaryAddress = Address().apply {
                                street = "123 Main Blvd"
                                city = "San Francisco"
                                state = "CA"
                                postalCode = "99910"
                            }
                        }
                    })
            }
            // :snippet-end:

            // :snippet-start: update-embedded-object
            // Modify the property of the embedded object in a write transaction
            realm.write {

                // Find the contact with the address you want to update
                val nickRiviera: Contact? =
                    this.query<Contact>("name = 'Nick Riviera'").first().find()

                    // Update the embedded object directly through the contact
                    nickRiviera?.address?.street = "100 10th St N"
            }
            // :snippet-end:

            // :snippet-start: overwrite-embedded-object
            // Create the new address
            val newAddress = Address(
                street = "202 Coconut Court",
                city = "Los Angeles",
                state = "CA",
                postalCode = "90210"
            )

            // Find the contact with the address you want to overwrite
            val nickRiviera: Contact? =
                realm.query<Contact>("name = 'Nick Riviera'").first().find()

            // Overwrite the embedded object (deletes the original embedded object)
            realm.write {
                nickRiviera?.address = newAddress
            }
            // :snippet-end:

            // :snippet-start: query-embedded-objects
            // Query a collection of embedded objects
            // You access the embedded object through the parent object
            val doctorsInNewYork: RealmResults<Contact> =
                realm.query<Contact>("address.state = 'NY'")
                    .sort("name")
                    .find()
            Log.v("NY Contacts: $doctorsInNewYork")

            // Access the parent object from an embedded object

            // :snippet-end:


            // :snippet-start: delete-embedded-object
            // Delete embedded object from parent object


            // Delete parent object also deletes the embedded object

            // :snippet-end:


            realm.close()
            Realm.deleteRealm(config)
        }
    }
}