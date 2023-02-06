// ... Fetch the object

// Overwrite the embedded object (deletes the original object)
realm.write {
    nicksAddress.apply {
        street = "202 Coconut Court"
        city = "Los Angeles"
        state = "CA"
        postalCode = "90210"
    }
}
