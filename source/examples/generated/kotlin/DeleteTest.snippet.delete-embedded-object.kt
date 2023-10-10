realm.write {
    // Delete an embedded object directly
    val addressToDelete = query<EmbeddedAddress>("street == $0", "456 Lily Pad Ln").find().first()
    // Delete the embedded object (nullifies the parent property)
    delete(addressToDelete)

    // Delete an embedded object through the parent
    val propertyToClear = query<Contact>("name == $0", "Kermit").find().first()
    // Clear the parent property (deletes the embedded object instance)
    propertyToClear.address = null

    // Delete the parent object (deletes all embedded objects)
    val businessToDelete = query<Business>("name == $0", "Big Frog Corp.").find().first()
    assertEquals(2, businessToDelete.addresses.size)
    delete(businessToDelete)
}
