// :replace-start: {
//   "terms": {
//     "EventLibrary_": ""
//   }
// }

import XCTest
import RealmSwift

// :code-block-start: custom-event-representable
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
// :code-block-end:

class EventLibrary: XCTestCase {
    var user: User!
    var collection: MongoCollection!
    var start: Date!

    override func setUp() {
        app.login(credentials: Credentials.anonymous) { [self] (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(user):
                print("Successfully logged in as user \(user)")
                let mongoClient = user.mongoClient("mongodb1")
                let database = mongoClient.database(named: "test_data")
                self.collection = database.collection(withName: "AuditEvent")
                _ = self.collection.deleteManyDocuments(filter: [:])
            case .success(_):
                print("This case should never be hit")
            }
        }
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testDefaultEventInitilization() {
        // :code-block-start: default-event-configuration
        var config = user.configuration(partitionValue: "Some partition value")
        config.eventConfiguration = EventConfiguration()
        // :code-block-end:
    }
    
    func testEventInitilizationWithParams() async {
        // :code-block-start: event-configuration-with-params
        let eventSyncUser = await login()
        var config = user.configuration(partitionValue: "Some partition value")
        config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: eventSyncUser, partitionPrefix: "event-")
        // :code-block-end:
        
        func login() async -> User? {
            do {
                let app = App(id: YOUR_REALM_APP_ID)
                // Authenticate with the instance of the app that points
                // to your backend. Here, we're using anonymous login.
                let user = try await app.login(credentials: Credentials.anonymous)
                print("Successfully logged in user: \(user)")
                return user
            } catch {
                print("Failed to log in user: \(error.localizedDescription)")
            }
            return nil
        }
    }
    
    func testInvokeEventRealm() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.eventConfiguration = EventConfiguration()
        // :code-block-start: invoke-event-realm
        let realm = try! Realm(configuration: config)
        let events = realm.events!
        // :code-block-end:
    }
    
    func recordReadAndWriteEvents() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.eventConfiguration = EventConfiguration()
        let realm = try! Realm(configuration: config)
        let events = realm.events!
        // :code-block-start: record-read-and-write-events
        // Read event
        events.beginScope(activity: "read object")
        var person = realm.objects(Person.self).first!
        events.endScope()
        events.beginScope(activity: "mutate object")
        // Write event
        try! realm.write {
            // Change name from "Anthony" to "Tony"
            person.name = "Tony"
        }
        events.endScope()
        // :code-block-end:
    }
    
    func recordCustomEvents() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.eventConfiguration = EventConfiguration()
        let realm = try! Realm(configuration: config)
        let events = realm.events!
        // :code-block-start: record-custom-events
        events.recordEvent(activity: "event", eventType: "press Home button")
        // :code-block-end:
    }
}

// :replace-end:
