// Define an embedded object
class Address() : EmbeddedRealmObject {
    var street: String? = null
    var city: String? = null
    var state: String? = null
    var postalCode: String? = null
}

// Define an object containing one embedded object
class Contact : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""

    // Embed a single object (must be optional)
    var address: Address? = null
}

// Define an object containing an array of embedded objects
class Business : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""

    // Embed an array of objects (cannot be null)
    var addresses: RealmList<Address> = realmListOf()
}
