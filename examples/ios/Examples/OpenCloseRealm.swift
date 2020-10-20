import XCTest
import RealmSwift

class OpenCloseRealm: AnonymouslyLoggedInTestCase {

    func testOpenSyncedRealm() throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: open-synced-realm
        let app = App(id: YOUR_REALM_APP_ID)
        // Log in...
        let user = app.currentUser
        let partitionValue = "myPartition"
        Realm.asyncOpen(configuration: user!.configuration(partitionValue: partitionValue)) { result in
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
        let realm = try! Realm(configuration: user!.configuration(partitionValue: partitionValue))
        print("Opened realm: \(realm)")
        // :code-block-end:

        wait(for: [expectation], timeout: 10)
    }

    func testOpenLocalRealm() {
        // :code-block-start: open-local-realm
        let config = Realm.Configuration(
            fileURL: Bundle.main.url(forResource: "myBundledData", withExtension: "realm"),
            inMemoryIdentifier: "myRealm")

        // Open the Realm with the configuration
        let realm = try! Realm(configuration: config)
        print("Opened realm: \(realm)")
        // :code-block-end:
    }

}
