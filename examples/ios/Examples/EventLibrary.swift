// :replace-start: {
//   "terms": {
//     "EventLibrary_": ""
//   }
// }

import XCTest
import RealmSwift

// :snippet-start: custom-event-representable
// To customize event serialization, your object must
// conform to the `CustomEventRepresentable` protocol.
class EventLibrary_Person: Object, CustomEventRepresentable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }

    // To conform to `CustomEventRepresentable`, your object
    // must implement a `customEventRepresentation` func that
    // defines your customized event serialization
    func customEventRepresentation() -> String {
        if employeeId == 0 {
            return "invalid json"
        }
        return "{\"int\": \(employeeId)}"
    }
}
// :snippet-end:

class EventLibrary: XCTestCase {
    var user: User!
    var collection: MongoCollection!
    var start: Date!

//    override func setUp() {
//        app.login(credentials: Credentials.anonymous) { [self] (result) in
//            switch result {
//            case .failure(let error):
//                print("Login failed: \(error.localizedDescription)")
//            case .success(user):
//                print("Successfully logged in as user \(user)")
//                let mongoClient = user.mongoClient("mongodb1")
//                let database = mongoClient.database(named: "test_data")
//                self.collection = database.collection(withName: "AuditEvent")
//                _ = self.collection.deleteManyDocuments(filter: [:])
//            case .success(_):
//                print("This case should never be hit")
//            }
//        }
//    }

    func deleteTestData() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                var config = user.configuration(partitionValue: "Some partition value")
                let realm = try! Realm(configuration: config)
                try! realm.write {
                    let eventPeople = realm.objects(EventLibrary_Person.self)
                    realm.delete(eventPeople)
                }
            }
        }
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testDefaultEventInitilization() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                initializeDefaultEventConfiguration()
            }
        }
        func initializeDefaultEventConfiguration() {
            let user = app.currentUser!
            // :snippet-start: default-event-configuration
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration()
            // :snippet-end:
        }
    }

    func testEventInitilizationWithParams() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
//                initializeEventConfigurationWithParameters()
            }
        }

        func initializeEventConfigurationWithParameters() async throws {
            // :snippet-start: event-configuration-with-params
            let eventSyncUser = try await app.login(credentials: Credentials.anonymous)
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: eventSyncUser, partitionPrefix: "event-")
            // :snippet-end:
        }
    }

    func testInvokeEventRealm() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                invokeEventRealm()
            }
        }

        func invokeEventRealm() {
            let user = app.currentUser!
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration()
            config.objectTypes = [EventLibrary_Person.self]
            // :snippet-start: invoke-event-realm
            let realm = try! Realm(configuration: config)
            let events = realm.events!
            // :snippet-end:
        }
    }

    func testRecordReadAndWriteEvents() {
        let expectation = XCTestExpectation(description: "Populate a read and write event")
        let readExpectation = XCTestExpectation(description: "Create read event in audit realm")
        let writeExpectation = XCTestExpectation(description: "Create write event in audit realm")
        let secondWriteExpectation = XCTestExpectation(description: "Create a second write event in audit realm")
        // createTestData()
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in to app")
                let user = app.currentUser!
                var config = user.configuration(partitionValue: "Some partition value")
                config.eventConfiguration = EventConfiguration()
                config.objectTypes = [EventLibrary_Person.self]
                Realm.asyncOpen(configuration: config) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                    case .success(let realm):
                        // Create a person to use in this func
                        try! realm.write {
                            realm.create(EventLibrary_Person.self, value: ["name": "Anthony", "employeeId": 1])
                        }
                        print("Successfully created a person")
                        recordReadAndWriteEvents(realm)
                    }
                }
            }
        }

        func recordReadAndWriteEvents(_ realm: Realm) {
            let events = realm.events!
            // :snippet-start: record-read-and-write-events
            // Read event
            events.beginScope(activity: "read object")
            print("I am in read object scope")
            let person = realm.objects(EventLibrary_Person.self).first!
            print("Successfully queried for person: \(person)")
            events.endScope(completion: { error in
                if let error = error {
                    print("Error recording read event: \(error.localizedDescription)")
                    return
                }
                print("Successfully recorded a read event")
                readExpectation.fulfill()
            })
            print("Read object scope has ended")
            events.beginScope(activity: "mutate object")
            print("I am in write object scope")
            // Write event
            try! realm.write {
                // Change name from "Anthony" to "Tony"
                person.name = "Tony"
            }
            print("Successfully changed the person's name to: \(person.name)")
            events.endScope(completion: { error in
                if let error = error {
                    print("Error recording write event: \(error.localizedDescription)")
                    return
                }
                print("Successfully recorded a write event")
                writeExpectation.fulfill()
            })
            print("Write object scope has ended")
            // :snippet-end:
            // :snippet-start: scoped-event-with-completion
            events.beginScope(activity: "mutate object")
            // Write event
            try! realm.write {
                // Add a userId
                person.userId = "tony.stark@starkindustries.com"
            }
            print("Successfully added a userId of: \(person.userId)")
            events.endScope(completion: { error in
                if let error = error {
                    print("Error recording write event: \(error.localizedDescription)")
                    return
                }
                print("Successfully recorded a write event")
                // :remove-start:
                secondWriteExpectation.fulfill()
                // :remove-end:
            })
            // :snippet-end:
            deleteTestData()
            expectation.fulfill()
        }
        wait(for: [expectation, readExpectation, writeExpectation, secondWriteExpectation], timeout: 10)
    }

    func testRecordCustomEvents() {
        let expectation = XCTestExpectation(description: "Record a custom event")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in to app")
                let user = app.currentUser!
                var config = user.configuration(partitionValue: "Some partition value")
                config.eventConfiguration = EventConfiguration()
                config.objectTypes = [EventLibrary_Person.self]
                Realm.asyncOpen(configuration: config) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                    case .success(let realm):
                        let events = realm.events!
                        // :snippet-start: record-custom-events
                        events.recordEvent(activity: "event", eventType: "custom event")
                        // :snippet-end:
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }
}

// :replace-end:
