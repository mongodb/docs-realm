class User: Object {
    @objc dynamic var _id: ObjectId = ""
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    let tasks = List<Task>()
    
    override static func primaryKey() -> String? {
        return "_id"
    }
}

class Task: Object {
    @objc dynamic var _id: ObjectId = ""
    @objc dynamic var _partition: String = ""
    @objc dynamic var text: String = ""
    let assignee = LinkingObjects(fromType: User.self, property: "tasks")
    
    override static func primaryKey() -> String? {
        return "_id"
    }
}
