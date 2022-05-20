// :replace-start: {
//   "terms": {
//     "EmbeddedObjectExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
// Define an embedded object
class EmbeddedObjectExamples_Address: EmbeddedObject {
    @Persisted var street: String?
    @Persisted var city: String?
    @Persisted var country: String?
    @Persisted var postalCode: String?
}

// Define an object with one embedded object
class EmbeddedObjectExamples_Contact: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @Persisted var address: EmbeddedObjectExamples_Address?

    convenience init(name: String, address: EmbeddedObjectExamples_Address) {
        self.init()
        self.name = name
        self.address = address
    }
}

// Define an object with an array of embedded objects
class EmbeddedObjectExamples_Business: Object {
    @Persisted var name = ""
    @Persisted var addresses: List<EmbeddedObjectExamples_Address> // Embed an array of objects

    convenience init(name: String, addresses: [EmbeddedObjectExamples_Address]) {
        self.init()
        self.name = name
        self.addresses.append(objectsIn: addresses)
    }
}
// :snippet-end:

class EmbeddedObjects: XCTestCase {
    override func setUp() {
        let realm = try! Realm()
        let address = EmbeddedObjectExamples_Address()
        address.street = "123 Fake St"
        address.city = "Springfield"
        address.country = "USA"
        address.postalCode = "90710"
        let contact = EmbeddedObjectExamples_Contact(name: "Nick Riviera", address: address)
        contact._id = ObjectId("5f47f4811060b1aa6cc71272")
        try! realm.write {
            realm.add(contact)
        }
    }

    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testCreateEmbeddedObject() {
        // :snippet-start: create-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        try! realm.write {
            let address = EmbeddedObjectExamples_Address()
            address.street = "123 Fake St"
            address.city = "Springfield"
            address.country = "USA"
            address.postalCode = "90710"
            let contact = EmbeddedObjectExamples_Contact(name: "Nick Riviera", address: address)
            realm.add(contact)
        }
        // :snippet-end:
    }

    func testUpdateEmbeddedObjectProperty() {
        // :snippet-start:  update-an-embedded-object-property
        // Open the default realm
        let realm = try! Realm()

        let idOfContactToUpdate = ObjectId("5f47f4811060b1aa6cc71272")

        // Find the contact to update by ID
        guard let contact = realm.object(ofType: EmbeddedObjectExamples_Contact.self, forPrimaryKey: idOfContactToUpdate) else {
            print("EmbeddedObjectExamples_Contact \(idOfContactToUpdate) not found")
            // :remove-start:
            XCTFail()
            // :remove-end:
            return
        }

        try! realm.write {
            // Update the embedded object directly through the contact
            contact.address?.street = "Hollywood Upstairs Medical College"
            contact.address?.city = "Los Angeles"
            contact.address?.postalCode = "90210"
            print("Updated contact: \(contact)")
        }
        // :snippet-end:
    }

    func testOverwriteEmbeddedObject() {
        // :snippet-start: overwrite-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        let idOfContactToUpdate = ObjectId("5f47f4811060b1aa6cc71272")

        // Find the contact to update by ID
        guard let contact = realm.object(ofType: EmbeddedObjectExamples_Contact.self, forPrimaryKey: idOfContactToUpdate) else {
            print("EmbeddedObjectExamples_Contact \(idOfContactToUpdate) not found")
            // :remove-start:
            XCTFail()
            // :remove-end:
            return
        }

        try! realm.write {
            let newAddress = EmbeddedObjectExamples_Address()
            newAddress.street = "Hollywood Upstairs Medical College"
            newAddress.city = "Los Angeles"
            newAddress.country = "USA"
            newAddress.postalCode = "90210"

            // Overwrite the embedded object
            contact.address = newAddress
            print("Updated contact: \(contact)")
        }
        // :snippet-end:
    }

    func testQueryEmbeddedObject() {
        // :snippet-start: query-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        // Get all contacts in Los Angeles, sorted by street address
        let losAngelesContacts = realm.objects(EmbeddedObjectExamples_Contact.self)
            .filter("address.city = %@", "Los Angeles")
            .sorted(byKeyPath: "address.street")
        print("Los Angeles EmbeddedObjectExamples_Contacts: \(losAngelesContacts)")
        // :snippet-end:
    }

    func testTypeSafeQueryEmbeddedObject() {
        // :snippet-start: tsq-query-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        // Get all contacts in Los Angeles, sorted by street address
        let losAngelesContacts = realm.objects(EmbeddedObjectExamples_Contact.self)
            .where {
                $0.address.city == "Los Angeles"
            }
            .sorted(byKeyPath: "address.street")
        print("Los Angeles EmbeddedObjectExamples_Contacts: \(losAngelesContacts)")
        // :snippet-end:
    }
}
// :replace-end:
