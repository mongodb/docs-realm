// :replace-start: {
//   "terms": {
//     "CrudExample_": ""
//   }
// }
import XCTest
import RealmSwift

// :code-block-start: models
class CrudExample_Dog: Object {
    @objc dynamic var age = 0
    @objc dynamic var name = ""
    @objc dynamic var owner: CrudExample_Person?
}

class CrudExample_Person: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""
    let dogs = LinkingObjects(fromType: CrudExample_Dog.self, property: "owner")

    override static func primaryKey() -> String? {
        return "id"
    }
}
// :code-block-end:

class Crud: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testBatchUpdateAndCascadingDelete() {
        // :code-block-start: batch-update
        let realm = try! Realm()
        try! realm.write {
            // Create a person to take care of some dogs.
            let person = CrudExample_Person(value: ["id": 1, "name": "Ali"])
            realm.add(person)

            let dog = CrudExample_Dog(value: ["name": "Rex", "age": 1])
            realm.add(dog)

            // :hide-start:
            XCTAssert(person.dogs.count == 0)
            // :hide-end:
            // Find dogs younger than 2.
            let puppies = realm.objects(CrudExample_Dog.self).filter("age < 2")

            // Give all puppies to Ali.
            puppies.setValue(person, forKey: "owner")

            // :hide-start:
            XCTAssert(person.dogs.count == 1)
            // :hide-end:
        }
        // :code-block-end:

        // :code-block-start: cascading-delete
        let person = realm.object(ofType: CrudExample_Person.self, forPrimaryKey: 1)!
        // :hide-start:
        XCTAssert(person.dogs.count == 1)
        // :hide-end:
        try! realm.write {
            // Delete the related collection
            realm.delete(person.dogs)
            realm.delete(person)
        }
        // :code-block-end:
        XCTAssert(realm.objects(CrudExample_Dog.self).count == 0)
        XCTAssert(realm.objects(CrudExample_Person.self).count == 0)
    }

    func testCreateAndDelete() {
        // :code-block-start: create
        // Instantiate the class. For convenience, you can initialize
        // objects from dictionaries with appropriate keys and values.
        let dog = CrudExample_Dog(value: ["name": "Max", "age": 5])

        let realm = try! Realm()
        // Open a thread-safe transaction.
        try! realm.write {
            // Add the instance to the realm.
            realm.add(dog)
        }
        // :code-block-end:

        // :code-block-start: delete
        try! realm.write {
            // Delete the instance from the realm.
            realm.delete(dog)
        }
        // :code-block-end:
    }

    func testDeleteAll() {
        // :code-block-start: delete-all
        let realm = try! Realm()

        try! realm.write {
            // Delete all objects from the realm.
            realm.deleteAll()
        }
        // :code-block-end:
    }

    func testDeleteAllOfClass() {
        // :code-block-start: delete-all-of-class
        let realm = try! Realm()

        try! realm.write {
            // Delete all instances of Dog from the realm.
            let allDogs = realm.objects(CrudExample_Dog.self)
            realm.delete(allDogs)
        }
        // :code-block-end:
    }

    func testDeleteCollection() {
        // :code-block-start: delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(CrudExample_Dog.self).filter("age < 2")

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :code-block-end:
    }

    func testObjects() {
        // :code-block-start: objects
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(CrudExample_Dog.self)
        // :code-block-end:
    }

    func testSort() {
        // :code-block-start: sort
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(CrudExample_Dog.self)

        let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

        // You can also sort on the members of linked objects. In this example,
        // we sort the dogs by dog's owner's name.
        let ownersByName = dogs.sorted(byKeyPath: "owner.name")
        // :code-block-end:
    }

    func testFilter() {
        // :code-block-start: filter
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(CrudExample_Dog.self)

        // Filter by age
        let puppies = dogs.filter("age < 2")

        // Filter by owner
        let availableDogs = dogs.filter("owner == nil")

        // Filter by owner's name
        let ownedByKeith = dogs.filter("owner.name == 'Keith'")
        // :code-block-end:
        print(puppies.count)
        print(availableDogs.count)
        print(ownedByKeith.count)
    }

    func testTransaction() {
        // :code-block-start: transaction
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
        // :code-block-end:
    }

    func testTransactionCounterexample() {
        // :code-block-start: transaction-counterexample
        let realm = try! Realm()
        // BAD EXAMPLE -- avoid this!

        realm.beginWrite()
        // ... Make changes ...
        // If an exception is thrown before the commit,
        // this transaction stays open!
        try! realm.commitWrite()
        // :code-block-end:
    }

    func testUpdate() {
        let setupRealm = try! Realm()
        try! setupRealm.write {
            setupRealm.add(CrudExample_Dog())
        }
        // :code-block-start: update
        let realm = try! Realm()

        // Get a dog to update
        let dog = realm.objects(CrudExample_Dog.self).first!

        // Open a thread-safe transaction
        try! realm.write {
            // Update some properties on the instance.
            // These changes are saved to the realm
            dog.name = "Wolfie"
            dog.age += 1
        }
        // :code-block-end:
    }

    func testUpsert() {
        // :code-block-start: upsert
        let realm = try! Realm()
        try! realm.write {
            let person1 = CrudExample_Person(value: ["id": 1234, "name": "Jones"])
            // Add a new person to the realm. Since nobody with ID 1234
            // has been added yet, this adds the instance to the realm.
            realm.add(person1, update: .modified)

            let person2 = CrudExample_Person(value: ["id": 1234, "name": "Bowie"])
            // Judging by the ID, it's the same person, just with a
            // different name. When `update` is:
            // - .modified: update the fields that have changed.
            // - .all: replace all of the fields regardless of
            //   whether they've changed.
            // - .error: throw an exception if a key with the same
            //   primary key already exists.
            realm.add(person2, update: .modified)
        }
        // :code-block-end:
    }
}

// :replace-end:
