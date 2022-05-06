// :replace-start: {
//   "terms": {
//     "Audit_": ""
//   }
// }

import XCTest
import RealmSwift

// :code-block-start: custom-audit-representable
// To customize audit event serialization, your object must
// conform to the `CustomAuditRepresentable` protocol.
class Audit_Person: Object, CustomAuditRepresentable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }
    
    // To conform to `CustomAuditRepresentable`, your object
    // must implement a `customAuditRepresentation` func that
    // defines your customized audit event serialization
    func customAuditRepresentation() -> String {
        if employeeId == 0 {
            return "invalid json"
        }
        return "{\"int\": \(employeeId)}"
    }
}
// :code-block-end:

class Audit: XCTestCase {
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

    func testDefaultAuditInitilization() {
        // :code-block-start: default-audit-configuration
        var config = user.configuration(partitionValue: "Some partition value")
        config.auditConfiguration = AuditConfiguration()
        // :code-block-end:
    }
    
    func testAuditInitilizationWithParams() async {
        // :code-block-start: audit-configuration-with-params
        let auditSyncUser = await login()
        var config = user.configuration(partitionValue: "Some partition value")
        config.auditConfiguration = AuditConfiguration(metadata: ["username": "Jason Bourne"], syncUser: auditSyncUser, partitionPrefix: "audit-")
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
    
    func testInvokeAuditRealm() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.auditConfiguration = AuditConfiguration()
        // :code-block-start: invoke-audit-realm
        let realm = try! Realm(configuration: config)
        let audit = realm.audit!
        // :code-block-end:
    }
    
    func recordReadAndWriteEvents() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.auditConfiguration = AuditConfiguration()
        let realm = try! Realm(configuration: config)
        let audit = realm.audit!
        // :code-block-start: record-read-and-write-events
        // Read event
        audit.beginScope(activity: "read object")
        var person = realm.objects(Person.self).first!
        audit.endScope()
        audit.beginScope(activity: "mutate object")
        // Write event
        try! realm.write {
            // Change name from "Anthony" to "Tony"
            person.name = "Tony"
        }
        audit.endScope()
        // :code-block-end:
    }
    
    func recordCustomEvents() {
        var config = user.configuration(partitionValue: "Some partition value")
        config.auditConfiguration = AuditConfiguration()
        let realm = try! Realm(configuration: config)
        let audit = realm.audit!
        // :code-block-start: record-custom-events
        audit.recordEvent(activity: "event", eventType: "press Home button")
        // :code-block-end:
    }
}

// :replace-end:
