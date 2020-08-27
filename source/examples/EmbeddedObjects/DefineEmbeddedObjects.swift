// Define an embedded object
class Address: EmbeddedObject {
    @objc dynamic var street: String? = nil
    @objc dynamic var city: String? = nil
    @objc dynamic var country: String? = nil
    @objc dynamic var postalCode: String? = nil
}

// Define an object with one embedded object
class Contact: Object {
    @objc dynamic var _id = ObjectId()
    @objc dynamic var name = ""
    @objc dynamic var address = Address() // Embed a single object
    
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
    @objc dynamic var _id = ObjectId()
    @objc dynamic var name = ""
    @objc dynamic var addresses: [Address] = [] // Embed an array of objects
    
    override static func primaryKey() -> String? {
        return "_id"
    }
    
    convenience init(name: String, addresses: [Address]) {
        self.init()
        self.name = name
        self.addresses = addresses
    }
}
