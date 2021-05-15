class Person: Object {
    // Required string property
    @objc dynamic var name: String = ""

    // Optional string property
    @objc dynamic var address: String?

    // Optional integral type property
    let age = RealmOptional<Int>()
}
