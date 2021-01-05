class ToManyExample_Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    
    // A person can have many dogs
    let dogs = List<ToManyExample_Dog>()
}

class ToManyExample_Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    // No backlink to person -- one-directional relationship
}