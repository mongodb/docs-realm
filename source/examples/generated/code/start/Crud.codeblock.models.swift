class Dog: Object {
    @objc dynamic var age = 0
    @objc dynamic var name = ""
    @objc dynamic var owner: Person? = nil
}

class Person: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""
    let dogs = LinkingObjects(fromType: Dog.self, property: "owner")
    
    override static func primaryKey() -> String? {
        return "id"
    }
}
