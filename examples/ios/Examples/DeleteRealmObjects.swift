// :replace-start: {
//   "terms": {
//     "DeleteExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class DeleteExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
}
// :snippet-end:
class DeleteExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<DeleteExamples_Dog>
}

class DeleteRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testDelete() {
        // :snippet-start: delete
        // Previously, we've added a dog object to the realm.
        let dog = DeleteExamples_Dog(value: ["name": "Max", "age": 5])

        let realm = try! Realm()
        try! realm.write {
            realm.add(dog)
        }

        // Delete the instance from the realm.
        try! realm.write {
            realm.delete(dog)
        }
        // :snippet-end:
    }

    func testDeleteAll() {
        // :snippet-start: delete-all
        let realm = try! Realm()

        try! realm.write {
            // Delete all objects from the realm.
            realm.deleteAll()
        }
        // :snippet-end:
    }

    func testDeleteAllOfClass() {
        // :snippet-start: delete-all-of-class
        let realm = try! Realm()

        try! realm.write {
            // Delete all instances of Dog from the realm.
            let allDogs = realm.objects(DeleteExamples_Dog.self)
            realm.delete(allDogs)
        }
        // :snippet-end:
    }

    func testDeleteCollection() {
        // :snippet-start: delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(DeleteExamples_Dog.self).filter("age < 2")

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :snippet-end:
    }

    func testTypeSafeQueryDeleteCollection() {
        // :snippet-start: tsq-delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(DeleteExamples_Dog.self).where {
                $0.age < 2
            }

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :snippet-end:
    }

    func testBatchUpdateAndCascadingDelete() {
        // TODO: CURRENTLY COMMENTED OUT UNTIL https://jira.mongodb.org/browse/RCOCOA-1282 IS FIXED
        /*
        // :snippet-start: batch-update
        let realm = try! Realm()
        try! realm.write {
            // Create a person to take care of some dogs.
            let person = DeleteExamples_Person(value: ["id": 1, "name": "Ali"])
            realm.add(person)

            let dog = DeleteExamples_Dog(value: ["name": "Rex", "age": 1])
            realm.add(dog)

            // :remove-start:
            XCTAssert(person.dogs.count == 0)
            // :remove-end:
            // Find dogs younger than 2.
            let puppies = realm.objects(DeleteExamples_Dog.self).filter("age < 2")

            // Give all puppies to Ali.
            person.setValue(puppies, forKey: "dogs")

            // :remove-start:
            XCTAssert(person.dogs.count == 1)
            // :remove-end:
        }
        // :snippet-end:

        // :snippet-start: cascading-delete
        let person = realm.object(ofType: DeleteExamples_Person.self, forPrimaryKey: 1)!
        // :remove-start:
        XCTAssert(person.dogs.count == 1)
        // :remove-end:
        try! realm.write {
            // Delete the related collection
            realm.delete(person.dogs)
            realm.delete(person)
        }
        // :snippet-end:
        XCTAssert(realm.objects(DeleteExamples_Dog.self).count == 0)
        XCTAssert(realm.objects(DeleteExamples_Person.self).count == 0)
        */
    }
}
// :replace-end:
