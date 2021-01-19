// Define an embedded object
class Address: EmbeddedObject {
    @objc dynamic var street: String?
    @objc dynamic var city: String?
    @objc dynamic var country: String?
    @objc dynamic var postalCode: String?
}

// Define an object with one embedded object
class Contact: Object {
    @objc dynamic var _id = ObjectId.generate()
    @objc dynamic var name = ""

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @objc dynamic var address: Address?

    override static func primaryKey() -> String? {
        return "_id"
    }

    convenience init(name: String, address: Address) {
        self.init()
        self.name = name
        self.address = address
    }
}

// Define an object with an array of embedded objects
class Business: Object {
    @objc dynamic var name = ""
    let addresses = List<Address>() // Embed an array of objects

    convenience init(name: String, addresses: [Address]) {
        self.init()
        self.name = name
        self.addresses.append(objectsIn: addresses)
    }
}
