// :replace-start: {
//   "terms": {
//     "UpdateExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class UpdateExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
}

class UpdateExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<UpdateExamples_Dog>
}
// :snippet-end:

class UpdateRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testUpdate() {
        let setupRealm = try! Realm()
        try! setupRealm.write {
            setupRealm.add(UpdateExamples_Dog())
        }
        // :snippet-start: update
        let realm = try! Realm()

        // Get a dog to update
        let dog = realm.objects(UpdateExamples_Dog.self).first!

        // Open a thread-safe transaction
        try! realm.write {
            // Update some properties on the instance.
            // These changes are saved to the realm
            dog.name = "Wolfie"
            dog.age += 1
        }
        // :snippet-end:
    }

    func testUpsert() {
        // :snippet-start: upsert
        let realm = try! Realm()
        try! realm.write {
            let person1 = UpdateExamples_Person(value: ["id": 1234, "name": "Jones"])
            // Add a new person to the realm. Since nobody with ID 1234
            // has been added yet, this adds the instance to the realm.
            realm.add(person1, update: .modified)

            let person2 = UpdateExamples_Person(value: ["id": 1234, "name": "Bowie"])
            // Judging by the ID, it's the same person, just with a
            // different name. When `update` is:
            // - .modified: update the fields that have changed.
            // - .all: replace all of the fields regardless of
            //   whether they've changed.
            // - .error: throw an exception if a key with the same
            //   primary key already exists.
            realm.add(person2, update: .modified)
        }
        // :snippet-end:
    }

    func testAsyncWriteQueryOnLocalThread() {
        let expectation = expectation(description: "Objects append")

        // :snippet-start: async-transaction
        let realm = try! Realm()

        // :remove-start:
        do {
            try realm.write {
                realm.create(UpdateExamples_Person.self, value: ["id": 1, "name": "Dachary"])
            }
        } catch {
            print("Error creating object: \(error.localizedDescription)")
        }
        // :remove-end:
        // Query for a specific person object on the main thread
        let people = realm.objects(UpdateExamples_Person.self)
        let thisPerson = people.where {
            $0.name == "Dachary"
        }.first

        // Perform an async write to add dogs to that person's dog list.
        // No need to pass a thread-safe reference or frozen object.
        realm.writeAsync {
            thisPerson?.dogs.append(objectsIn: [
                UpdateExamples_Dog(value: ["name": "Ben", "age": 13]),
                UpdateExamples_Dog(value: ["name": "Lita", "age": 9]),
                UpdateExamples_Dog(value: ["name": "Maui", "age": 1])
            ])
        } onComplete: { _ in
            // Confirm the three dogs were successfully added to the person's dogs list
            XCTAssertEqual(thisPerson!.dogs.count, 3)
            // Query for one of the dogs we added and see that it is present
            let dogs = realm.objects(UpdateExamples_Dog.self)
            let benDogs = dogs.where {
                $0.name == "Ben"
            }
            XCTAssertEqual(benDogs.count, 1)
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }
        // :snippet-end:
        waitForExpectations(timeout: 5)
    }

    func testKeyValueCoding() {
        // :snippet-start: key-value-coding
        let realm = try! Realm()

        let allDogs = realm.objects(UpdateExamples_Dog.self)

        try! realm.write {
            allDogs.first?.setValue("Sparky", forKey: "name")
            // Move the dogs to Toronto for vacation
            allDogs.setValue("Toronto", forKey: "currentCity")
        }
        // :snippet-end:
    }

    func testPartialUpdate() {
        // :snippet-start: partial-update
        let realm = try! Realm()
        try! realm.write {
            // Use .modified to only update the provided values.
            // Note that the "name" property will remain the same
            // for the person with primary key "id" 123.
            realm.create(UpdateExamples_Person.self,
                         value: ["id": 123, "dogs": [["Buster", 5]]],
                         update: .modified)
        }
        // :snippet-end:
    }
}
// :replace-end:
