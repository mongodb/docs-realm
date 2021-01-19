// :replace-start: {
//   "terms": {
//     "ReadWriteDataExamples": ""
//   }
// }
import XCTest
import RealmSwift

// :code-block-start: models
class ReadWriteDataExamples_Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var age = 0
}

class ReadWriteDataExamples_DogOwner: Object {
    @objc dynamic var id = 0

    // To-many relationship - a dog owner can have many dogs
    let dogs = List<ReadWriteDataExamples_Dog>()
    
    // Inverse relationship - an owner can be a member of many clubs
    let clubs = LinkingObjects(fromType: ReadWriteDataExamples_DogClub.self, property: "members")

    override static func primaryKey() -> String? {
        return "id"
    }
}

class ReadWriteDataExamples_DogClub: Object {
    @objc dynamic var name = ""
    let members = List<ReadWriteDataExamples_DogOwner>()
}
// :code-block-end:

class ReadWriteData: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    func testCreateNewObject() {
        // :code-block-start: create-a-new-object
        // (1) Create a ReadWriteDataExamples_Dog object and then set its properties
        let myReadWriteDataExamples_Dog = ReadWriteDataExamples_Dog()
        myReadWriteDataExamples_Dog.name = "Rex"
        myReadWriteDataExamples_Dog.age = 10
        
        // (2) Create a ReadWriteDataExamples_Dog object from a dictionary
        let myOtherReadWriteDataExamples_Dog = ReadWriteDataExamples_Dog(value: ["name" : "Pluto", "age": 3])

        // (3) Create a ReadWriteDataExamples_Dog object from an array
        let myThirdReadWriteDataExamples_Dog = ReadWriteDataExamples_Dog(value: ["Fido", 5])
        
        // Get the default realm. You only need to do this once per thread.
        let realm = try! Realm()

        // Add to the realm inside a transaction
        try! realm.write {
            realm.add(myReadWriteDataExamples_Dog)
        }
        // :code-block-end:
    }
    
    func testFindObjectByPrimaryKey() {
        // :code-block-start: find-a-specific-object-by-primary-key
        let realm = try! Realm()
        
        let specificReadWriteDataExamples_DogOwner = realm.object(ofType: ReadWriteDataExamples_DogOwner.self, forPrimaryKey: 12345)
        // :code-block-end:
    }
    
    func testQueryRelationship() {
        // :code-block-start: query-a-relationship
        let realm = try! Realm()

        // Establish a relationship
        let dog = ReadWriteDataExamples_Dog()
        dog.name = "Rex"
        dog.age = 10

        let owner = ReadWriteDataExamples_DogOwner()
        owner.id = 12345
        owner.dogs.append(dog)

        try! realm.write {
            realm.add(owner)
        }

        // Later, query the specific owner
        let specificOwner = realm.object(ofType: ReadWriteDataExamples_DogOwner.self, forPrimaryKey: 12345)
        
        // Access directly through a relationship
        print("# dogs: \(specificOwner!.dogs.count)")
        print("First dog's name: \(specificOwner!.dogs[0].name)")
        // :code-block-end:
    }
    
    func testQueryInverseRelationship() {
        // :code-block-start: query-an-inverse-relationship
        let realm = try! Realm()

        // Establish an inverse relationship
        let owner = ReadWriteDataExamples_DogOwner()
        owner.id = 12345
        
        let club = ReadWriteDataExamples_DogClub()
        club.name = "Pooch Pals"
        club.members.append(owner)

        try! realm.write {
            realm.add(club)
        }

        // Later, query the specific owner
        let specificOwner = realm.object(ofType: ReadWriteDataExamples_DogOwner.self, forPrimaryKey: 12345)
        
        // Access directly through an inverse relationship
        print("# memberships: \(specificOwner!.clubs.count)")
        print("First club's name: \(specificOwner!.clubs[0].name)")
        
        // :code-block-end:
    }
}

// :replace-end:
