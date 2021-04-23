// :replace-start: {
//   "terms": {
//     "ThreadingExamples_": "",
//     "fileprivate ": ""
//   }
// }
import XCTest
import RealmSwift

class ThreadingExamples_Person: Object {
    @objc dynamic var name = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

class ThreadingExamples_Email: Object {
    @objc dynamic var read = false
}

// :code-block-start: write-async-extension
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
// :code-block-end:

class Threading: XCTestCase {
    override func setUp() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: self.name)
    }

    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testFreeze() {
        // :code-block-start: freeze
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

        // When you want to modify a frozen object, you can thaw it
        let thawedTask = task.thaw()

        assert(thawedTask!.isFrozen == false)

        // You can thaw collections
        let thawedTasks = tasks.thaw()

        assert(thawedTasks!.isFrozen == false)

        // And you can thaw a frozen Realm
        let thawedRealm = realm.thaw()

        assert(thawedRealm.isFrozen == false)
        // :code-block-end:
    }

    func testPassAcrossThreads() {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: pass-across-threads
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
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testWriteAsyncExtension() {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: use-write-async-extension
        let realm = try! Realm()
        let readEmails = realm.objects(ThreadingExamples_Email.self).filter("read == true")
        realm.writeAsync(readEmails) { (realm, readEmails) in
            guard let readEmails = readEmails else {
                // Already deleted
                expectation.fulfill() // :remove:
                return
            }
            realm.delete(readEmails)
            expectation.fulfill() // :remove:
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}

// :replace-end:
