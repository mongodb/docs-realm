import RealmSwift

class Task: Object {
    @Persisted(primaryKey: true) var _id: ObjectId

    // When configuring Sync, we selected `_partition` as the partition key.
    // A partition key is only required if you are using Sync.
    @Persisted var _partition: String = ""

    @Persisted var name: String = ""
    @Persisted var owner: String?
    @Persisted var status: String = ""

    convenience init(partition: String, name: String) {
        self.init()
        self._partition = partition
        self.name = name
    }
}
