class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String? = nil
    @objc dynamic var status: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }

    var statusEnum: TaskStatus {
        get {
            return TaskStatus(rawValue: status) ?? .Open
        }
        set {
            status = newValue.rawValue
        }
    }
    
    convenience init(partition: String, name: String) {
        self.init()
        self._partition = partition
        self.name = name
    }
}