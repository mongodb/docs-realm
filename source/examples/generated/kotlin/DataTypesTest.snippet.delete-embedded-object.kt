//  Delete embedded object from parent object
realm.write {
    val addressToDelete: Address =
        this.query<Address>("street == '123 Fake St'").find().first()
    delete(addressToDelete)
}

// Delete parent object also deletes the embedded object
realm.write {
    val contactToDelete: Contact =
        this.query<Contact>("name == 'Nick Riviera'").find().first()

    // Delete the parent and its embedded objects permanently
    delete(contactToDelete)
}
