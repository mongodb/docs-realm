class Person: Object {
    @objc dynamic var _id = ObjectId()
    @objc dynamic var name = ""
    let dogs = LinkingObjects(fromType: Dog.self, property: "owner")
    override static func primaryKey() -> String? {
        return "_id"
    }
}
