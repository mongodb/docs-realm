// Open the default realm
let realm = try! Realm()

let idOfContactToUpdate = ObjectId("5f47f4811060b1aa6cc71272")

// Find the contact to update by ID
guard let contact = realm.object(ofType: Contact.self, forPrimaryKey: idOfContactToUpdate) else {
    print("Contact \(idOfContactToUpdate) not found")
    return
}

try! realm.write {
    // Update the embedded object directly through the contact
    contact.address?.street = "Hollywood Upstairs Medical College"
    contact.address?.city = "Los Angeles"
    contact.address?.postalCode = "90210"
    print("Updated contact: \(contact)")
}
