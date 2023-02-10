//  Delete an embedded object
realm.write {
    val addressToDelete: Address =
        this.query<Address>("street == '123 Fake St'").find().first()
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
