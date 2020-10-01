class User: Object {
    @objc dynamic var _id: String = ""
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    let memberOf = RealmSwift.List<Project>()
    override static func primaryKey() -> String? {
        return "_id"
    }
}