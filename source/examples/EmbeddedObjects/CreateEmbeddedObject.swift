let realm = try! Realm()

try! realm.write {
    let address = Address()
    address.street = "123 Fake St."
    address.city = "Springfield"
    address.country = "USA"
    address.postalCode = "90710"
    let contact = Contact(name: "Nick Riviera", address: address);
    realm.add(contact)
}
