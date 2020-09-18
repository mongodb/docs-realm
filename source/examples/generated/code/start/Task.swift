import RealmSwift

class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()

    // When configuring Sync, we selected `_partition` as the partition key.
    // A partition key is only required if you are using Sync.
    @objc dynamic var _partition: String = ""

    @objc dynamic var name: String = ""
    @objc dynamic var owner: String? = nil
    @objc dynamic var status: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }

    convenience init(partition: String, name: String) {
        self.init()
        self._partition = partition;
        self.name = name;
    }
}
