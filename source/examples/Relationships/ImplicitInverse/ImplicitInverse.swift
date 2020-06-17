class Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    let dogs = List<Dog>()
}

class Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    let owners = LinkingObjects(fromType: Person.self, property: "dogs")
}
