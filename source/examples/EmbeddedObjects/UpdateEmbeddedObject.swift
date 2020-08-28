let id = ObjectId("5f47f4811060b1aa6cc71272") // An arbitrary id
try! realm.write {
    guard let contact = realm.object(ofType: Contact.self, forPrimaryKey: id) else {
        print("Contact not found")
        return
    }
    contact.address?.street = "Hollywood Upstairs Medical College"
    contact.address?.city = "Los Angeles"
    contact.address?.postalCode = "90210"
    print("Updated contact: \(contact)")
}
