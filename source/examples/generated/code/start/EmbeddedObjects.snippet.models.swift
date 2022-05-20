// Define an embedded object
class Address: EmbeddedObject {
    @Persisted var street: String?
    @Persisted var city: String?
    @Persisted var country: String?
    @Persisted var postalCode: String?
}

// Define an object with one embedded object
class Contact: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @Persisted var address: Address?

    convenience init(name: String, address: Address) {
        self.init()
        self.name = name
        self.address = address
    }
}

// Define an object with an array of embedded objects
class Business: Object {
    @Persisted var name = ""
    @Persisted var addresses: List<Address> // Embed an array of objects

    convenience init(name: String, addresses: [Address]) {
        self.init()
        self.name = name
        self.addresses.append(objectsIn: addresses)
    }
}
