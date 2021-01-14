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

class ReadWriteData: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    func testCreateNewObject() {
        // :code-block-start: create-a-new-object
        // (1) Create a Dog object and then set its properties
        let myDog = Dog()
        myDog.name = "Rex"
        myDog.age = 10
        
        // (2) Create a Dog object from a dictionary
        let myOtherDog = Dog(value: ["name" : "Pluto", "age": 3])

        // (3) Create a Dog object from an array
        let myThirdDog = Dog(value: ["Fido", 5])
        
        // Get the default realm. You only need to do this once per thread.
        let realm = try! Realm()

        // Add to the realm inside a transaction
        try! realm.write {
            realm.add(myDog)
        }