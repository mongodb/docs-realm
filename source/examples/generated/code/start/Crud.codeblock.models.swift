class CrudExample_Dog: Object {
    @objc dynamic var age = 0
    @objc dynamic var name = ""
    @objc dynamic var owner: CrudExample_Person? = nil
}

class CrudExample_Person: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""
    let dogs = LinkingObjects(fromType: CrudExample_Dog.self, property: "owner")
    
    override static func primaryKey() -> String? {
        return "id"
    }
}