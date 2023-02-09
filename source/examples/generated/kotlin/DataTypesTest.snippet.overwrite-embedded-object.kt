// Overwrite the embedded object in a write transaction
realm.write {
    // Fetch the object
    val addressToOverwrite: Address =
        realm.query<Address>("street == '123 Fake St'").find().first()

    // Overwrite the embedded object (updates the existing object)
    addressToOverwrite.apply {
        street = "202 Coconut Court"
        city = "Los Angeles"
        state = "CA"
        postalCode = "90210"
    }
}
