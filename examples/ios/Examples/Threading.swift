// :replace-start: {
//   "terms": {
//     "ThreadingExamples_": "",
//     "fileprivate ": "",
//     "ReadWriteDataExamples_": ""
//   }
// }
import XCTest
import RealmSwift

class ThreadingExamples_Person: Object {
    @Persisted var name = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

class ThreadingExamples_Email: Object {
    @Persisted var read = false
}

// :snippet-start: write-async-extension
fileprivate extension Realm {
    func writeAsync<T: ThreadConfined>(_ passedObject: T, errorHandler: @escaping ((_ error: Swift.Error) -> Void) = { _ in return }, block: @escaping ((Realm, T?) -> Void)) {
        let objectReference = ThreadSafeReference(to: passedObject)
        let configuration = self.configuration
        DispatchQueue(label: "background").async {
            autoreleasepool {
                do {
                    let realm = try Realm(configuration: configuration)
                    try realm.write {
                        // Resolve within the transaction to ensure you get the latest changes from other threads
                        let object = realm.resolve(objectReference)
                        block(realm, object)
                    }
                } catch {
                    errorHandler(error)
                }
            }
        }
    }
}
// :snippet-end:

class Threading: XCTestCase {
    override func setUp() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: self.name)
    }

    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testFreeze() {
        // :snippet-start: freeze
        let realm = try! Realm()

        // :hide-start:
        try! realm.write {
            realm.add(Task())
        }
        // :hide-end:
        // Get an immutable copy of the realm that can be passed across threads
        let frozenRealm = realm.freeze()

        assert(frozenRealm.isFrozen)

        let tasks = realm.objects(Task.self)

        // You can freeze collections
        let frozenTasks = tasks.freeze()

        assert(frozenTasks.isFrozen)

        // You can still read from frozen realms
        let frozenTasks2 = frozenRealm.objects(Task.self)

        assert(frozenTasks2.isFrozen)

        let task = tasks.first!

        assert(!task.realm!.isFrozen)

        // You can freeze objects
        let frozenTask = task.freeze()

        assert(frozenTask.isFrozen)
        // Frozen objects have a reference to a frozen realm
        assert(frozenTask.realm!.isFrozen)
        // :snippet-end:
    }

    func testThaw() {
        let realm = try! Realm()

        try! realm.write {
            realm.add(Task())
        }

        let frozenRealm = realm.freeze()

        // :snippet-start: thaw
        // Read from a frozen realm
        let frozenTasks = frozenRealm.objects(Task.self)

        // The collection that we pull from the frozen realm is also frozen
        assert(frozenTasks.isFrozen)

        // Get an individual task from the collection
        let frozenTask = frozenTasks.first!

        // To modify the task, you must first thaw it
        // You can also thaw collections and realms
        let thawedTask = frozenTask.thaw()

        // Check to make sure this task is valid. An object is
        // invalidated when it is deleted from its managing realm,
        // or when its managing realm has invalidate() called on it.
        assert(thawedTask?.isInvalidated == false)

        // Thawing the task also thaws the frozen realm it references
        assert(thawedTask!.realm!.isFrozen == false)

        // Let's make the code easier to follow by naming the thawed realm
        let thawedRealm = thawedTask!.realm!

        // Now, you can modify the task
        try! thawedRealm.write {
           thawedTask!.status = "Done"
        }
        // :snippet-end:
    }

    func testAppendToFrozenCollection() {
        let hiddenRealm = try! Realm()
        let person = ReadWriteDataExamples_Person(value: ["name": "Timmy"])
        let dog = ReadWriteDataExamples_Dog(value: ["name": "Lassie", "age": 79, "color": "Brown and white", "currentCity": "Yorkshire"])
        try! hiddenRealm.write {
            hiddenRealm.add(person)
            hiddenRealm.add(dog)
        }
        let frozenRealm = hiddenRealm.freeze()
        // :snippet-start: append-to-frozen-collection
        // Get a copy of frozen objects.
        // Here, we're getting them from a frozen realm,
        // but you might also be passing them across threads.
        let frozenTimmy = frozenRealm.objects(ReadWriteDataExamples_Person.self).where {
            $0.name == "Timmy"
        }.first!
        let frozenLassie = frozenRealm.objects(ReadWriteDataExamples_Dog.self).where {
            $0.name == "Lassie"
        }.first!
        // Confirm the objects are frozen.
        assert(frozenTimmy.isFrozen == true)
        assert(frozenLassie.isFrozen == true)
        // Thaw the frozen objects. You must thaw both the object
        // you want to append and the collection you want to append it to.
        let thawedTimmy = frozenTimmy.thaw()
        let thawedLassie = frozenLassie.thaw()
        let realm = try! Realm()
        try! realm.write {
            thawedTimmy?.dogs.append(thawedLassie!)
        }
        XCTAssertEqual(thawedTimmy?.dogs.first?.name, "Lassie")
        // :snippet-end:
    }

    func testPassAcrossThreads() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: pass-across-threads
        let person = ThreadingExamples_Person(name: "Jane")
        let realm = try! Realm()

        try! realm.write {
            realm.add(person)
        }

        // Create thread-safe reference to person
        let personRef = ThreadSafeReference(to: person)

        // Pass the reference to a background thread
        DispatchQueue(label: "background").async {
            autoreleasepool {
                let realm = try! Realm()
                try! realm.write {
                    // Resolve within the transaction to ensure you get the latest changes from other threads
                    guard let person = realm.resolve(personRef) else {
                        return // person was deleted
                    }
                    person.name = "Jane Doe"
                }
                expectation.fulfill() // :remove:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testThreadSafeWrapper() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: threadsafe-wrapper
        let realm = try! Realm()

        let person = ThreadingExamples_Person(name: "Jane")
        try! realm.write {
            realm.add(person)
        }

        // Create thread-safe reference to person
        @ThreadSafe var personRef = person

        // @ThreadSafe vars are always optional. If the referenced object is deleted,
        // the @ThreadSafe var will be nullified.
        print("Person's name: \(personRef?.name ?? "unknown")")

        // Pass the reference to a background thread
        DispatchQueue(label: "background").async {
            autoreleasepool {
                let realm = try! Realm()
                try! realm.write {
                    // Resolve within the transaction to ensure you get the
                    // latest changes from other threads. If the person
                    // object was deleted, personRef will be nil.
                    guard let person = personRef else {
                        return // person was deleted
                    }
                    person.name = "Jane Doe"
                }
                expectation.fulfill() // :remove:
            }
        }
        // :snippet-end:

        wait(for: [expectation], timeout: 10)
    }

    func testThreadSafeWrapperParameter() async {
        let expectation = XCTestExpectation(description: "it completes")
        func someLongCallToGetNewName() async -> String {
            return "Test"
        }

        // :snippet-start: threadsafe-wrapper-function-parameter
        func loadNameInBackground(@ThreadSafe person: ThreadingExamples_Person?) async {
            let newName = await someLongCallToGetNewName()
            let realm = try! await Realm()
            try! realm.write {
                person?.name = newName
            }
            expectation.fulfill() // :remove:
        }

        let realm = try! await Realm()

        let person = ThreadingExamples_Person(name: "Jane")
        try! realm.write {
            realm.add(person)
        }
        await loadNameInBackground(person: person)
        // :snippet-end:

        XCTAssertEqual(person.name, "Test")
        wait(for: [expectation], timeout: 10)
    }

    func testWriteAsyncExtension() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: use-write-async-extension
        let realm = try! Realm()
        let readEmails = realm.objects(ThreadingExamples_Email.self).where {
            $0.read == true
        }
        realm.writeAsync(readEmails) { (realm, readEmails) in
            guard let readEmails = readEmails else {
                // Already deleted
                expectation.fulfill() // :remove:
                return
            }
            realm.delete(readEmails)
            expectation.fulfill() // :remove:
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testCreateSerialQueueToUseRealm() {
        // :snippet-start: use-realm-with-serial-queue
        // Initialize a serial queue, and
        // perform realm operations on it
        let serialQueue = DispatchQueue(label: "serial-queue")
        serialQueue.async {
            let realm = try! Realm(configuration: .defaultConfiguration, queue: serialQueue)
            // Do something with Realm on the non-main thread
        }
        // :snippet-end:
    }
}

// :replace-end:
