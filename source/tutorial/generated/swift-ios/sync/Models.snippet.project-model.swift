class Project: EmbeddedObject {
    @Persisted var name: String?
    @Persisted var partition: String?
    convenience init(partition: String, name: String) {
        self.init()
        self.partition = partition
        self.name = name
    }
}
