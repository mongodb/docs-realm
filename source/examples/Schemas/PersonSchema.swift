class Person: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""
    let dogs = LinkingObjects(fromType: Dog.self, property: "owner")
    override static func primaryKey() -> String? {
        return "id"
    }
    
}
