// Modify the property of the embedded object in a write transaction
realm.write {
    // Fetch the objects
    val addressToUpdate = findLatest(address)?: error("Cannot find latest version of embedded object")
    val contactToUpdate = findLatest(contact)?: error("Cannot find latest version of parent object")

    // Update the embedded object property directly
    addressToUpdate.street = "100 10th St N"

    // Update property through the parent object
    contactToUpdate.address?.state = "NY"
}
