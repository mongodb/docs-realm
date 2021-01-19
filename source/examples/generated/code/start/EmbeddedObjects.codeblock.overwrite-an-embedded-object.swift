// Open the default realm
let realm = try! Realm()

let idOfContactToUpdate = ObjectId("5f47f4811060b1aa6cc71272")

// Find the contact to update by ID
guard let contact = realm.object(ofType: Contact.self, forPrimaryKey: idOfContactToUpdate) else {
    print("Contact \(idOfContactToUpdate) not found")
    return
}

try! realm.write {
    let newAddress = Address()
    newAddress.street = "Hollywood Upstairs Medical College"
    newAddress.city = "Los Angeles"
    newAddress.country = "USA"
    newAddress.postalCode = "90210"

    // Overwrite the embedded object
    contact.address = newAddress
    print("Updated contact: \(contact)")
}
