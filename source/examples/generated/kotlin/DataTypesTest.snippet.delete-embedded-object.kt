//  Delete an embedded object directly from parent
realm.write {
    val addressToDelete: Address =
        this.query<Address>("street == '123 Fake St'").find().first()

    // Deletes only the specified embedded object
    delete(addressToDelete)
}

// Delete parent object (deletes all embedded objects)
realm.write {
    val contactToDelete: Contact =
        this.query<Contact>("name == 'Nick Riviera'").find().first()

    // Deletes the parent and any embedded objects
    delete(contactToDelete)
}
