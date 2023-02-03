val nickRiviera = Contact()
val nicksAddress = Address()

// Create a parent object with one embedded address
realm.write {
    this.copyToRealm(
        nickRiviera.apply {
            name = "Nick Riviera"

            // Embed the address in the contact object
            address = nicksAddress.apply {
                street = "123 Fake St"
                city = "Some Town"
                state = "MA"
                postalCode = "12345"
            }
        })
}
