// Create a parent object with one embedded address
realm.write {
    val contact = copyToRealm(Contact())
        contact.apply {
            name = "Nick Riviera"

            // Embed the address in the contact object
            address = Address().apply {
                street = "123 Fake St"
                city = "Some Town"
                state = "MA"
                postalCode = "12345"
            }
        }
}
