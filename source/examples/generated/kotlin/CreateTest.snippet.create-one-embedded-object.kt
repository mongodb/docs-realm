// Open a write transaction
realm.write {
    // Create a parent object with one embedded address
    val contact = Contact().apply {
        name = "Kermit"
        address = EmbeddedAddress().apply {
            propertyOwner = Contact().apply { name = "Mr. Frog" }
            street = "123 Pond St"
            country = EmbeddedCountry().apply { name = "United States" }
        }
    }
    // Copy all objects to realm to return a managed instance
    copyToRealm(contact)
}
