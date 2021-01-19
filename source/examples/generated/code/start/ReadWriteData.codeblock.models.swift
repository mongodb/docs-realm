class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var age = 0
}

class DogOwner: Object {
    @objc dynamic var id = 0

    // To-many relationship - a dog owner can have many dogs
    let dogs = List<Dog>()

    // Inverse relationship - an owner can be a member of many clubs
    let clubs = LinkingObjects(fromType: DogClub.self, property: "members")

    override static func primaryKey() -> String? {
        return "id"
    }
}

class DogClub: Object {
    @objc dynamic var name = ""
    let members = List<DogOwner>()
}
