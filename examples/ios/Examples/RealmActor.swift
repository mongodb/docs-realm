// :replace-start: {
//   "terms": {
//     "RealmActor_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: model
class RealmActor_Todo: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var owner: String
    @Persisted var status: String
}
//  :snippet-end:

// :snippet-start: define-realm-actor
actor RealmActor {
    // An implicitly-unwrapped optional is used here to let us pass `self` to
    // `Realm(actor:)` within `init`
    var realm: Realm!
    init() async throws {
        realm = try await Realm(actor: self)
    }

    var count: Int {
        realm.objects(RealmActor_Todo.self).count
    }
    
    // :snippet-start: write-async
    func createTodo(name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(RealmActor_Todo.self, value: [
                "_id": ObjectId.generate(),
                "name": name,
                "owner": owner,
                "status": status
            ])
        }
    }
    // :snippet-end:
    
    // :snippet-start: update-async
    func updateTodo(_id: ObjectId, name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(RealmActor_Todo.self, value: [
                "_id": _id,
                "name": name,
                "owner": owner,
                "status": status
            ], update: .modified)
        }
    }
    // :snippet-end:
    
    // :snippet-start: delete-async
    func deleteTodo(todo: RealmActor_Todo) async throws {
        try await realm.asyncWrite {
            realm.delete(todo)
        }
    }
    // :snippet-end:
    
    func close() {
        realm = nil
    }
    
    // :remove-start:
    func removeAll() async throws {
        try await realm.asyncWrite {
            let allTodos = realm.objects(RealmActor_Todo.self)
            realm.delete(allTodos)
        }
    }
    // :remove-end:
}
// :snippet-end:

class RealmActorTests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() async throws {
        let actor = try await RealmActor()
        try await actor.removeAll()
        await actor.close()
    }

    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
#if swift(>=5.8)
    func testActorIsolatedRealmAsync() async throws {
        // :snippet-start: actor-isolated-realm-async
        func createObject() async throws {
            // Because this function is not isolated to this actor,
            // you must await operations completed on the actor
            try await actor.createTodo(name: "Write a new documentation page", owner: "Dachary", status: "In Progress")
            let taskCount = await actor.count
            print("The actor currently has \(taskCount) tasks")
            XCTAssertEqual(taskCount, 1) // :remove:
        }
        
        let actor = try await RealmActor()
        
        try await createObject()
        // :snippet-end:
        await actor.close()
    }
    
    func testActorIsolatedRealmSynchronous() async throws {
        // :snippet-start: actor-isolated-realm-synchronous
        func createObject(in actor: isolated RealmActor) async throws {
            // Because this function is isolated to this actor, you can use
            // realm synchronously in this context without async/await keywords
            try actor.realm.write {
                actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Write new code examples",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
            let taskCount = actor.count
            print("The actor currently has \(taskCount) tasks")
            XCTAssertEqual(taskCount, 1) // :remove:
        }
        
        let actor = try await RealmActor()
        
        try await createObject(in: actor)
        // :snippet-end:
        await actor.close()
    }
    
    func testActorIsolatedRealmUpdate() async throws {
        func createObject(in actor: isolated RealmActor) async throws {
            try actor.realm.write {
                actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Write an example of updating an object on a RealmActor",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
        }
        // :snippet-start: update-object
        // :snippet-start: read-objects
        let actor = try await RealmActor()
        
        try await createObject(in: actor)
        
        let todo = await actor.realm.objects(RealmActor_Todo.self).where {
            $0.name == "Write an example of updating an object on a RealmActor"
        }.first!
        // :snippet-end:
        
        XCTAssertNotNil(todo) // :remove:
        
        try await actor.updateTodo(_id: todo._id, name: todo.name, owner: todo.owner, status: "Completed")
        // :snippet-end:
        sleep(1)
        XCTAssertEqual(todo.status, "Completed")
        await actor.close()
    }
    
    func testActorIsolatedRealmDelete() async throws {
        func createObject(in actor: isolated RealmActor) async throws -> RealmActor_Todo {
            return try actor.realm.write {
                return actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Write an example of deleting an object on a RealmActor",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
        }
        // :snippet-start: delete-object
        
        let actor = try await RealmActor()
        
        let todo = try await createObject(in: actor)
        XCTAssertNotNil(todo) // :remove:
        print("Successfully created an object with id: \(todo._id)")
        let todoCount = await actor.count
        XCTAssertEqual(todoCount, 1) // :remove:
        
        try await actor.deleteTodo(todo: todo)
        let updatedTodoCount = await actor.count
        XCTAssertEqual(updatedTodoCount, 0) // :remove:
        if updatedTodoCount == todoCount - 1 {
            print("Successfully deleted the todo")
        }
        // :snippet-end:
        await actor.close()
    }
    
    func testOpenActorConfinedRealm() async throws {
        try await mainThreadFunction()
        // :snippet-start: await-main-actor-realm
        @MainActor
        func mainThreadFunction() async throws {
            // These are identical: the async init produces a
            // MainActor-confined Realm if no actor is supplied
            let realm1 = try await Realm()
            let realm2 = try await Realm(actor: MainActor.shared)
            
            try await useTheRealm(realm: realm1)
        }
        // :snippet-end:
        @MainActor
        func useTheRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0) // :remove:
            print("Todo item count is: \(todoItems.count)")
            
            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Write async/await code examples",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
            await realm.asyncRefresh()
            XCTAssertEqual(todoItems.count, 1) // :remove:
            print("Todo item count is now: \(todoItems.count)")
        }
    }
    
    func testOpenActorConfinedRealmWithConfig() async throws {
        try await mainThreadFunction()
        // :snippet-start: actor-confined-realm-with-config
        @MainActor
        func mainThreadFunction() async throws {
            let username = "GordonCole"
            
            // Customize the default realm config
            var config = Realm.Configuration.defaultConfiguration
            config.fileURL!.deleteLastPathComponent()
            config.fileURL!.appendPathComponent(username)
            config.fileURL!.appendPathExtension("realm")
            
            // Open an actor-confined realm with a specific configuration
            let realm = try await Realm(configuration: config, actor: MainActor.shared)
            
            try await useTheRealm(realm: realm)
        }
        // :snippet-end:
        @MainActor
        func useTheRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0) // :remove:
            print("Todo item count is: \(todoItems.count)")
            
            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Write code example showing a config",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
            await realm.asyncRefresh()
            XCTAssertEqual(todoItems.count, 1) // :remove:
            print("Todo item count is now: \(todoItems.count)")
        }
    }
    
    func testOpenActorConfinedSyncedRealm() async throws {
        try await mainThreadFunction()
        // :snippet-start: actor-confined-synced-realm
        @MainActor
        func mainThreadFunction() async throws {
            // Initialize the app client and authenticate a user
            let app = App(id: APPID)
            let user = try await app.login(credentials: Credentials.anonymous)
            
            // Configure the synced realm
            var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(QuerySubscription<RealmActor_Todo>(name: "all_todos"))})
            flexSyncConfig.objectTypes = [RealmActor_Todo.self]
            
            // Open and use the synced realm
            let realm = try await Realm(configuration: flexSyncConfig, actor: MainActor.shared, downloadBeforeOpen: .always)
            try await useTheSyncedRealm(realm: realm)
        }
        // :snippet-end:
        @MainActor
        func useTheSyncedRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0) // :remove:
            print("Todo item count at start of test is: \(todoItems.count)")

            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Write synced realm code example",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
            sleep(2)
            XCTAssertEqual(todoItems.count, 1)
            print("Todo item count after adding an item is: \(todoItems.count)")
            print("The first todo ID is: \(todoItems.first!._id)")
            try! realm.write {
                realm.deleteAll()
            }
            sleep(2)
            print("Todo item count after deleting is: \(todoItems.count)")
            XCTAssertEqual(todoItems.count, 0)
        }
    }
    
    func testAwaitBackgroundActor() async throws {
        try await mainThreadFunction()
        
        // :snippet-start: global-actor-example
        // A simple example of a custom global actor
        @globalActor actor BackgroundActor: GlobalActor {
            static var shared = BackgroundActor()
        }

        @BackgroundActor
        func backgroundThreadFunction() async throws {
            // Explicitly specifying the actor is required for anything that is not MainActor
            let realm = try await Realm(actor: BackgroundActor.shared)
            try await realm.asyncWrite {
                _ = realm.create(RealmActor_Todo.self, value: [
                    "name": "Write async/await code examples",
                    "owner": "Dachary",
                    "status": "In Progress"
                ])
            }
            // Thread-confined Realms would sometimes throw an exception here, as we
            // may end up on a different thread after an `await`
            let todoCount = realm.objects(RealmActor_Todo.self).count
            print("The number of Realm objects is: \(todoCount)")
            XCTAssertEqual(todoCount, 1) // :remove:
        }
        
        @MainActor
        func mainThreadFunction() async throws {
            try await backgroundThreadFunction()
        }
        // :snippet-end:
    }
    
    func testObserveCollectionOnActor() async throws {
        let expectation = expectation(description: "A notification is triggered")
        // :snippet-start: observe-collection-on-actor
        let actor = try await RealmActor()
        
        // Add a todo to the realm so the collection has something to observe
        try await actor.createTodo(name: "Write a code example for actor observability", owner: "Dachary", status: "In Progress")
        let todoCount = await actor.count
        print("The actor currently has \(todoCount) tasks")
        XCTAssertEqual(todoCount, 1) // :remove:
        
        // Get a collection
        let todos = await actor.realm.objects(RealmActor_Todo.self)
        
        // Register a notification token, providing the actor
        let token = await todos.observe(on: actor, { actor, changes in
            print("A change occurred on actor: \(actor)")
            switch changes {
            case .initial:
                print("The initial value of the changed object was: \(changes)")
            case .update(_, let deletions, let insertions, let modifications):
                if !deletions.isEmpty {
                    print("An object was deleted: \(changes)")
                } else if !insertions.isEmpty {
                    print("An object was inserted: \(changes)")
                } else if !modifications.isEmpty {
                    print("An object was modified: \(changes)")
                    expectation.fulfill() // :remove:
                }
            case .error(let error):
                print("An error occurred: \(error.localizedDescription)")
            }
        })
        
        // Make an update to an object to trigger the notification
        await actor.realm.writeAsync {
            todos.first!.status = "Completed"
        }
        
        await fulfillment(of: [expectation], timeout: 2) // :remove:
        // Invalidate the token when done observing
        token.invalidate()
        // :snippet-end:
        await actor.close()
    }
    
    func testObserveObjectOnActor() async throws {
        let expectation = expectation(description: "A notification is triggered")
        // :snippet-start: observe-object-on-actor
        let actor = try await RealmActor()
        
        // Add a todo to the realm so we can observe it
        try await actor.createTodo(name: "Write a code example for observing an object on an actor", owner: "Dachary", status: "In Progress")
        let todoCount = await actor.count
        print("The actor currently has \(todoCount) tasks")
        XCTAssertEqual(todoCount, 1) // :remove:
        
        // Get an object
        let todo = await actor.realm.objects(RealmActor_Todo.self).where {
            $0.name == "Write a code example for observing an object on an actor"
        }.first!
        
        // Register a notification token, providing the actor
        let token = await todo.observe(on: actor, { actor, change in
            print("A change occurred on actor: \(actor)")
            switch change {
            case .change(let object, let properties):
                for property in properties {
                    print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
                    expectation.fulfill() // :remove:
                }
            case .error(let error):
                print("An error occurred: \(error)")
            case .deleted:
                print("The object was deleted.")
            }
        })
        
        // Make an update to an object to trigger the notification
        await actor.realm.writeAsync {
            todo.status = "Completed"
        }
        
        await fulfillment(of: [expectation], timeout: 2) // :remove:
        // Invalidate the token when done observing
        token.invalidate()
        // :snippet-end:
        XCTAssertEqual(todo.status, "Completed")
        await actor.close()
    }
#endif
}
// :replace-end:
