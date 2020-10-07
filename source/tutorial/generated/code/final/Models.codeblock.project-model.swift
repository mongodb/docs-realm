class Project: EmbeddedObject {
    @objc dynamic var name: String? = nil
    @objc dynamic var partition: String? = nil
    convenience init(partition: String, name: String) {
        self.init()
        self.partition = partition
        self.name = name
    }
}