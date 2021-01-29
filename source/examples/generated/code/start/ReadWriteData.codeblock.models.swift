class DogToy: Object {
    @objc dynamic var name = ""
}

class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var age = 0

    // To-one relationship
    @objc dynamic var favoriteToy: DogToy?
}

class Person: Object {
    @objc dynamic var id = 0

    // To-many relationship - a person can have many dogs
    let dogs = List<Dog>()

    // Inverse relationship - a person can be a member of many clubs
    let clubs = LinkingObjects(fromType: DogClub.self, property: "members")

    override static func primaryKey() -> String? {
        return "id"
    }
}

class DogClub: Object {
    @objc dynamic var name = ""
    let members = List<Person>()
}
