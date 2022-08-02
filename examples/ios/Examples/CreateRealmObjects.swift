// :replace-start: {
//   "terms": {
//     "CreateExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class CreateExamples_DogToy: Object {
    @Persisted var name = ""
}

class CreateExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""

    // To-one relationship
    @Persisted var favoriteToy: CreateExamples_DogToy?
}

class CreateExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<CreateExamples_Dog>
}
// :snippet-end:

class CreateRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testCreate() {
        // :snippet-start: create
        // Instantiate the class. For convenience, you can initialize
        // objects from dictionaries with appropriate keys and values.
        let dog = CreateExamples_Dog(value: ["name": "Max", "age": 5])

        let realm = try! Realm()
        // Open a thread-safe transaction.
        try! realm.write {
            // Add the instance to the realm.
            realm.add(dog)
        }
        // :snippet-end:
    }

    func testCreateNewObject() {
        // :snippet-start: create-a-new-object
        // (1) Create a CreateExamples_Dog object and then set its properties
        let myDog = CreateExamples_Dog()
        myDog.name = "Rex"
        myDog.age = 10

        // (2) Create a CreateExamples_Dog object from a dictionary
        let myOtherDog = CreateExamples_Dog(value: ["name": "Pluto", "age": 3])

        // (3) Create a CreateExamples_Dog object from an array
        let myThirdDog = CreateExamples_Dog(value: ["Fido", 5])

        // Get the default realm. You only need to do this once per thread.
        let realm = try! Realm()

        // Add to the realm inside a transaction
        try! realm.write {
            realm.add(myDog)
        }
        // :snippet-end:
    }

    func testCopyToAnotherRealm() {
        // :snippet-start: copy-to-another-realm
        let realm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "first realm"))

        try! realm.write {
            let dog = CreateExamples_Dog()
            dog.name = "Wolfie"
            dog.age = 1
            realm.add(dog)
        }

        // Later, fetch the instance we want to copy
        let wolfie = realm.objects(CreateExamples_Dog.self).first(where: { $0.name == "Wolfie" })!

        // Open the other realm
        let otherRealm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "second realm"))
        try! otherRealm.write {
            // Copy to the other realm
            let wolfieCopy = otherRealm.create(type(of: wolfie), value: wolfie)
            wolfieCopy.age = 2

            // Verify that the copy is separate from the original
            XCTAssertNotEqual(wolfie.age, wolfieCopy.age)
        }
        // :snippet-end:
    }

    func testJson() {
        // :snippet-start: json
        // Specify a dog toy in JSON
        let data = "{\"name\": \"Tennis ball\"}".data(using: .utf8)!
        let realm = try! Realm()
        // Insert from data containing JSON
        try! realm.write {
            let json = try! JSONSerialization.jsonObject(with: data, options: [])
            realm.create(CreateExamples_DogToy.self, value: json)
        }
        // :snippet-end:
    }

    func testNestedObjects() {
        let aDog = CreateExamples_Dog(value: ["Buster", 5])
        let anotherDog = CreateExamples_Dog(value: ["Buddy", 6])
        // :snippet-start: nested-objects
        // Instead of using pre-existing dogs...
        let aPerson = CreateExamples_Person(value: [123, "Jane", [aDog, anotherDog]])

        // ...we can create them inline
        let anotherPerson = CreateExamples_Person(value: [123, "Jane", [["Buster", 5], ["Buddy", 6]]])
        // :snippet-end:
    }

    func testTransaction() {
        // :snippet-start: transaction
        // Open the default realm.
        let realm = try! Realm()

        // Prepare to handle exceptions.
        do {
            // Open a thread-safe transaction.
            try realm.write {
                // Make any writes within this code block.
                // Realm automatically cancels the transaction
                // if this code throws an exception. Otherwise,
                // Realm automatically commits the transaction
                // after the end of this code block.
            }
        } catch let error as NSError {
            // Failed to write to realm.
            // ... Handle error ...
        }
        // :snippet-end:
    }
}
// :replace-end:
