class Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    
    // A person can have many dogs
    let dogs = List<Dog>()
}

class Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    // No backlink to person -- one-directional relationship
}
