// LocalOnlyQsTask is the Task model for this QuickStart
class LocalOnlyQsTask: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?
    @objc dynamic var status: String = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}
