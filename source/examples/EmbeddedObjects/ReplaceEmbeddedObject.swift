let id = ObjectId("5f47f4811060b1aa6cc71272") // An arbitrary id
try! realm.write {
    guard let contact = realm.object(ofType: Contact.self, forPrimaryKey: id) else {
        print("Contact not found")
        return
    }
    let newAddress = Address()
    newAddress.street = "Hollywood Upstairs Medical College"
    newAddress.city = "Los Angeles"
    newAddress.country = "USA"
    newAddress.postalCode = "90210"
    contact.address = newAddress
    print("Updated contact: \(contact)")
}
