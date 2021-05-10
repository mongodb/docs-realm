// QsTask is the Task model for this QuickStart
class QsTask: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?
    @objc dynamic var status: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}
