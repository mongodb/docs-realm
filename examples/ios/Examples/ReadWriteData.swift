// :replace-start: {
//   "terms": {
//     "ReadWriteDataExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class ReadWriteDataExamples_DogToy: Object {
    @Persisted var name = ""
}

class ReadWriteDataExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""

    // To-one relationship
    @Persisted var favoriteToy: ReadWriteDataExamples_DogToy?
}

class ReadWriteDataExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<ReadWriteDataExamples_Dog>

    // Inverse relationship - a person can be a member of many clubs
    @Persisted(originProperty: "members") var clubs: LinkingObjects<ReadWriteDataExamples_DogClub>
}

class ReadWriteDataExamples_DogClub: Object {
    @Persisted var name = ""
    @Persisted var members: List<ReadWriteDataExamples_Person>
}
// :snippet-end:

// :snippet-start: object-id-model
class ReadWriteDataExamples_User: Object {
    @Persisted var id: ObjectId
    @Persisted var name = ""
}
// :snippet-end:

class ReadWriteData: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testCreateNewObject() {
        // :snippet-start: create-a-new-object
        // (1) Create a ReadWriteDataExamples_Dog object and then set its properties
        let myDog = ReadWriteDataExamples_Dog()
        myDog.name = "Rex"
        myDog.age = 10

        // (2) Create a ReadWriteDataExamples_Dog object from a dictionary
        let myOtherDog = ReadWriteDataExamples_Dog(value: ["name": "Pluto", "age": 3])

        // (3) Create a ReadWriteDataExamples_Dog object from an array
        let myThirdDog = ReadWriteDataExamples_Dog(value: ["Fido", 5])

        // Get the default realm. You only need to do this once per thread.
        let realm = try! Realm()

        // Add to the realm inside a transaction
        try! realm.write {
            realm.add(myDog)
        }
        // :snippet-end:
    }

    func testFindObjectByPrimaryKey() {
        // :snippet-start: find-a-specific-object-by-primary-key
        let realm = try! Realm()

        let specificPerson = realm.object(ofType: ReadWriteDataExamples_Person.self, forPrimaryKey: 12345)
        // :snippet-end:
    }

    func testQueryRelationship() {
        // :snippet-start: query-a-relationship
        let realm = try! Realm()

        // Establish a relationship
        let dog = ReadWriteDataExamples_Dog()
        dog.name = "Rex"
        dog.age = 10

        let person = ReadWriteDataExamples_Person()
        person.id = 12345
        person.dogs.append(dog)

        try! realm.write {
            realm.add(person)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadWriteDataExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through a relationship
        let specificPersonDogs = specificPerson!.dogs
        let firstDog = specificPersonDogs[0]
        print("# dogs: \(specificPersonDogs.count)")
        print("First dog's name: \(firstDog.name)")
        // :snippet-end:
    }

    func testQueryInverseRelationship() {
        // :snippet-start: query-an-inverse-relationship
        let realm = try! Realm()

        // Establish an inverse relationship
        let person = ReadWriteDataExamples_Person()
        person.id = 12345

        let club = ReadWriteDataExamples_DogClub()
        club.name = "Pooch Pals"
        club.members.append(person)

        try! realm.write {
            realm.add(club)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadWriteDataExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through an inverse relationship
        let clubs = specificPerson!.clubs
        let firstClub = clubs[0]
        print("# memberships: \(clubs.count)")
        print("First club's name: \(firstClub.name)")

        // :snippet-end:
    }

    func testBatchUpdateAndCascadingDelete() {
        // TODO: CURRENTLY COMMENTED OUT UNTIL https://jira.mongodb.org/browse/RCOCOA-1282 IS FIXED
        /*
        // :snippet-start: batch-update
        let realm = try! Realm()
        try! realm.write {
            // Create a person to take care of some dogs.
            let person = ReadWriteDataExamples_Person(value: ["id": 1, "name": "Ali"])
            realm.add(person)

            let dog = ReadWriteDataExamples_Dog(value: ["name": "Rex", "age": 1])
            realm.add(dog)

            // :remove-start:
            XCTAssert(person.dogs.count == 0)
            // :remove-end:
            // Find dogs younger than 2.
            let puppies = realm.objects(ReadWriteDataExamples_Dog.self).filter("age < 2")

            // Give all puppies to Ali.
            person.setValue(puppies, forKey: "dogs")

            // :remove-start:
            XCTAssert(person.dogs.count == 1)
            // :remove-end:
        }
        // :snippet-end:

        // :snippet-start: cascading-delete
        let person = realm.object(ofType: ReadWriteDataExamples_Person.self, forPrimaryKey: 1)!
        // :remove-start:
        XCTAssert(person.dogs.count == 1)
        // :remove-end:
        try! realm.write {
            // Delete the related collection
            realm.delete(person.dogs)
            realm.delete(person)
        }
        // :snippet-end:
        XCTAssert(realm.objects(ReadWriteDataExamples_Dog.self).count == 0)
        XCTAssert(realm.objects(ReadWriteDataExamples_Person.self).count == 0)
        */
    }

    func testCreateAndDelete() {
        // :snippet-start: create
        // Instantiate the class. For convenience, you can initialize
        // objects from dictionaries with appropriate keys and values.
        let dog = ReadWriteDataExamples_Dog(value: ["name": "Max", "age": 5])

        let realm = try! Realm()
        // Open a thread-safe transaction.
        try! realm.write {
            // Add the instance to the realm.
            realm.add(dog)
        }
        // :snippet-end:

        // :snippet-start: delete
        try! realm.write {
            // Delete the instance from the realm.
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
            let allDogs = realm.objects(ReadWriteDataExamples_Dog.self)
            realm.delete(allDogs)
        }
        // :snippet-end:
    }

    func testDeleteCollection() {
        // :snippet-start: delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(ReadWriteDataExamples_Dog.self).filter("age < 2")

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
            let puppies = realm.objects(ReadWriteDataExamples_Dog.self).where {
                $0.age < 2
            }

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :snippet-end:
    }

    func testObjects() {
        // :snippet-start: objects
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadWriteDataExamples_Dog.self)
        // :snippet-end:
    }

    func testSort() {
        // :snippet-start: sort
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadWriteDataExamples_Dog.self)

        let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

        // You can also sort on the members of linked objects. In this example,
        // we sort the dogs by their favorite toys' names.
        let dogsSortedByFavoriteToyName = dogs.sorted(byKeyPath: "favoriteToy.name")
        // :snippet-end:
    }

    func testFilter() {
        // :snippet-start: filter
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadWriteDataExamples_Dog.self)

        // Filter by age
        let puppies = dogs.filter("age < 2")

        // Filter by person
        let dogsWithoutFavoriteToy = dogs.filter("favoriteToy == nil")

        // Filter by person's name
        let dogsWhoLikeTennisBalls = dogs.filter("favoriteToy.name == 'Tennis ball'")
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testWhere() {
        // :snippet-start: where
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadWriteDataExamples_Dog.self)

        // Query by age
        let puppies = dogs.where {
            $0.age < 2
        }

        // Query by person
        let dogsWithoutFavoriteToy = dogs.where {
            $0.favoriteToy == nil
        }

        // Query by person's name
        let dogsWhoLikeTennisBalls = dogs.where {
            $0.favoriteToy.name == "Tennis ball"
        }
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testQueryObjectId() {
        // :snippet-start: query-object-id
        let realm = try! Realm()

        let users = realm.objects(ReadWriteDataExamples_User.self)

        // Get specific user by ObjectId id
        let specificUser = users.filter("id = %@", ObjectId("11223344556677889900aabb")).first

        // WRONG: Realm will not convert the string to an object id
        // users.filter("id = '11223344556677889900aabb'") // not ok
        // users.filter("id = %@", "11223344556677889900aabb") // not ok
        // :snippet-end:
        print("\(specificUser ?? ReadWriteDataExamples_User())")
    }

    func testTypeSafeQueryObjectId() {
        // :snippet-start: tsq-object-id
        let realm = try! Realm()

        let users = realm.objects(ReadWriteDataExamples_User.self)

        // Get specific user by ObjectId id
        let specificUser = users.where {
            $0.id == ObjectId("11223344556677889900aabb")
        }
        // :snippet-end:
        print("\(specificUser)")
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

    func testTransactionCounterexample() {
        // :snippet-start: transaction-counterexample
        let realm = try! Realm()
        // BAD EXAMPLE -- avoid this!

        realm.beginWrite()
        // ... Make changes ...
        // If an exception is thrown before the commit,
        // this transaction stays open!
        try! realm.commitWrite()
        // :snippet-end:
    }

    func testAsyncWriteQueryOnLocalThread() {
        let expectation = expectation(description: "Objects append")

        // :code-block-start: async-transaction
        let realm = try! Realm()

        // :remove-start:
        do {
            try realm.write {
                realm.create(ReadWriteDataExamples_Person.self, value: ["id": 1, "name": "Dachary"])
            }
        } catch {
            print("Error creating object: \(error.localizedDescription)")
        }
        // :remove-end:
        // Query for a specific person object on the main thread
        let people = realm.objects(ReadWriteDataExamples_Person.self)
        let thisPerson = people.where {
            $0.name == "Dachary"
        }.first

        // Perform an async write to add dogs to that person's dog list.
        // No need to pass a thread-safe reference or frozen object.
        realm.writeAsync {
            thisPerson?.dogs.append(objectsIn: [
                ReadWriteDataExamples_Dog(value: ["name": "Ben", "age": 13]),
                ReadWriteDataExamples_Dog(value: ["name": "Lita", "age": 9]),
                ReadWriteDataExamples_Dog(value: ["name": "Maui", "age": 1])
            ])
        } onComplete: { _ in
            // Confirm the three dogs were successfully added to the person's dogs list
            XCTAssertEqual(thisPerson!.dogs.count, 3)
            // Query for one of the dogs we added and see that it is present
            let dogs = realm.objects(ReadWriteDataExamples_Dog.self)
            let benDogs = dogs.where {
                $0.name == "Ben"
            }
            XCTAssertEqual(benDogs.count, 1)
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }
        // :code-block-end:
        waitForExpectations(timeout: 5)
    }

    func testUpdate() {
        let setupRealm = try! Realm()
        try! setupRealm.write {
            setupRealm.add(ReadWriteDataExamples_Dog())
        }
        // :snippet-start: update
        let realm = try! Realm()

        // Get a dog to update
        let dog = realm.objects(ReadWriteDataExamples_Dog.self).first!

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
            let person1 = ReadWriteDataExamples_Person(value: ["id": 1234, "name": "Jones"])
            // Add a new person to the realm. Since nobody with ID 1234
            // has been added yet, this adds the instance to the realm.
            realm.add(person1, update: .modified)

            let person2 = ReadWriteDataExamples_Person(value: ["id": 1234, "name": "Bowie"])
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

    func testAggregate() {
        // :snippet-start: aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadWriteDataExamples_Person.self)

        // People whose dogs' average age is 5
        people.filter("dogs.@avg.age == 5")

        // People with older dogs
        people.filter("dogs.@min.age > 5")

        // People with younger dogs
        people.filter("dogs.@max.age < 2")

        // People with many dogs
        people.filter("dogs.@count > 2")

        // People whose dogs' ages combined > 10 years
        people.filter("dogs.@sum.age > 10")
        // :snippet-end:
    }

    func testTypeSafeQueryAggregate() {
        // :snippet-start: tsq-aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadWriteDataExamples_Person.self)

        // People whose dogs' average age is 5
        people.where {
            $0.dogs.age.avg == 5
        }

        // People with older dogs
        people.where {
            $0.dogs.age.min > 5
        }

        // People with younger dogs
        people.where {
            $0.dogs.age.max < 2
        }

        // People with many dogs
        people.where {
            $0.dogs.count > 2
        }

        // People whose dogs' ages combined > 10 years
        people.where {
            $0.dogs.age.sum > 10
        }
        // :snippet-end:
    }

    func testCopyToAnotherRealm() {
        // :snippet-start: copy-to-another-realm
        let realm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "first realm"))

        try! realm.write {
            let dog = ReadWriteDataExamples_Dog()
            dog.name = "Wolfie"
            dog.age = 1
            realm.add(dog)
        }

        // Later, fetch the instance we want to copy
        let wolfie = realm.objects(ReadWriteDataExamples_Dog.self).first(where: { $0.name == "Wolfie" })!

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

    func testKeyValueCoding() {
        // :snippet-start: key-value-coding
        let realm = try! Realm()

        let allDogs = realm.objects(ReadWriteDataExamples_Dog.self)

        try! realm.write {
            allDogs.first?.setValue("Sparky", forKey: "name")
            // Move the dogs to Toronto for vacation
            allDogs.setValue("Toronto", forKey: "currentCity")
        }
        // :snippet-end:
    }

    func testChainQuery() {
        // :snippet-start: chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadWriteDataExamples_Dog.self).filter("color = 'tan'")
        let tanDogsWithBNames = tanDogs.filter("name BEGINSWITH 'B'")
        // :snippet-end:
    }

    func testTypeSafeChainQuery() {
        // :snippet-start: tsq-chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadWriteDataExamples_Dog.self).where {
            $0.color == "tan"
        }
        let tanDogsWithBNames = tanDogs.where {
            $0.name.starts(with: "B")
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
            realm.create(ReadWriteDataExamples_DogToy.self, value: json)
        }
        // :snippet-end:
    }

    func testNestedObjects() {
        let aDog = ReadWriteDataExamples_Dog(value: ["Buster", 5])
        let anotherDog = ReadWriteDataExamples_Dog(value: ["Buddy", 6])
        // :snippet-start: nested-objects
        // Instead of using pre-existing dogs...
        let aPerson = ReadWriteDataExamples_Person(value: [123, "Jane", [aDog, anotherDog]])

        // ...we can create them inline
        let anotherPerson = ReadWriteDataExamples_Person(value: [123, "Jane", [["Buster", 5], ["Buddy", 6]]])
        // :snippet-end:
    }

    func testPartialUpdate() {
        // :snippet-start: partial-update
        let realm = try! Realm()
        try! realm.write {
            // Use .modified to only update the provided values.
            // Note that the "name" property will remain the same
            // for the person with primary key "id" 123.
            realm.create(ReadWriteDataExamples_Person.self,
                         value: ["id": 123, "dogs": [["Buster", 5]]],
                         update: .modified)
        }
        // :snippet-end:
    }
}

// :replace-end:
