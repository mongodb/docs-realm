import XCTest
import RealmSwift

class OpenCloseRealm: AnonymouslyLoggedInTestCase {

    func testOpenSyncedRealm() throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: open-synced-realm
        let app = App(id: YOUR_REALM_APP_ID)
        // Log in...
        let user = app.currentUser
        let partitionValue = "some partition value"
        
        var configuration = user!.configuration(partitionValue: partitionValue)
        
        // The following is only required if you want to specify exactly which
        // types to include in the realm. By default, Realm automatically finds
        // all subclasses of Object and EmbeddedObject to add to the realm.
        configuration.objectTypes = [Task.self]
        
        Realm.asyncOpen(configuration: configuration) { result in
            switch result {
            case .failure(let error):
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            case .success(let realm):
                print("Successfully opened realm: \(realm)")
                // Use realm
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
        }
        // :code-block-end:

        // :code-block-start: open-synced-realm-synchronously
        let realm = try! Realm(configuration: configuration)
        print("Opened realm: \(realm)")
        // :code-block-end:

        wait(for: [expectation], timeout: 10)
    }

    func testOpenLocalRealm() {
        // :code-block-start: open-local-realm
        // Open the default realm
        let defaultRealm = try! Realm()
        
        // Open the realm with a specific file URL, for example a username
        let username = "GordonCole"
        var config = Realm.Configuration.defaultConfiguration;
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent(username)
        config.fileURL!.appendPathExtension("realm")
        let realm = try! Realm(configuration: config)
        print("Opened realm: \(realm)")
        // :code-block-end:
    }
}
