// ... Fetch the parent object

// Overwrite the embedded object
realm.write {
    nicksAddress.apply {
        street = "202 Coconut Court"
        city = "Los Angeles"
        state = "CA"
        postalCode = "90210"
    }
}
