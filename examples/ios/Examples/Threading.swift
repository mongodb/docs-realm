// :replace-start: {
//   "terms": {
//     "ThreadingExamples_": ""
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
                guard let person = realm.resolve(personRef) else {
                    return // person was deleted
                }
                try! realm.write {
                    person.name = "Jane Doe"
                }
                expectation.fulfill() // :remove:
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
// :replace-end:
