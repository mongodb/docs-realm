// :replace-start: {
//   "terms": {
//     "SyncExamples_": ""
//   }
// }
import RealmSwift
import XCTest

class SyncExamples_Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }
}

class Sync: AnonymouslyLoggedInTestCase {
    func testOpenSyncedRealm() throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: open-synced-realm
        let app = App(id: YOUR_REALM_APP_ID)
        // Log in...
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :hide-start:
        // The following is only required if you want to specify exactly which
        // types to include in the realm. By default, Realm automatically finds
        // all subclasses of Object and EmbeddedObject to add to the realm.
        configuration.objectTypes = [SyncExamples_Task.self]
        // :hide-end:
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

    func testPauseResumeSyncSession() {
        let app = App(id: YOUR_REALM_APP_ID)
        // Log in...
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :hide-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :hide-end:
        let syncedRealm = try! Realm(configuration: configuration)

        // :code-block-start: pause-resume-sync-session
        let syncSession = syncedRealm.syncSession!
        // Suspend synchronization
        syncSession.suspend()

        // Later, resume synchronization
        syncSession.resume()
        // :code-block-end:

        // :code-block-start: check-network-connection
        // Read connectionState directly from syncSession
        let connectionState = syncSession.connectionState

        // Observe connectionState for changes using KVO
        let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
            switch syncSession.connectionState {
            case .connecting:
                print("Connecting...")
            case .connected:
                print("Connected")
            case .disconnected:
                print("Disconnected")
            default:
                break
            }
        }
        // :code-block-end:
    }

    func testCheckProgress() {
        let app = App(id: YOUR_REALM_APP_ID)
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :hide-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :hide-end:
        let syncedRealm = try! Realm(configuration: configuration)
        let expectation = XCTestExpectation(description: "it completes")

        // :code-block-start: check-progress
        let syncSession = syncedRealm.syncSession!
        let token = syncSession.addProgressNotification(
            for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in

            let transferredBytes = progress.transferredBytes
            let transferableBytes = progress.transferrableBytes
            let transferPercent = progress.fractionTransferred * 100

            print("Uploaded \(transferredBytes)B / \(transferableBytes)B (\(transferPercent)%)")
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }

        // Upload something
        try! syncedRealm.write {
            syncedRealm.add(SyncExamples_Task())
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testResetClientRealmFile() {
        // :code-block-start: reset-client-realm-file
        autoreleasepool {
            // all Realm usage here -- explicitly guarantee
            // that all realm objects are deallocated
            // before deleting the file
        }
        do {
            let app = App(id: YOUR_REALM_APP_ID)
            let user = app.currentUser
            let partitionValue = "some partition value"
            var configuration = user!.configuration(partitionValue: partitionValue)
            // :hide-start:
            configuration.objectTypes = [SyncExamples_Task.self]
            // :hide-end:
            _ = try Realm.deleteFiles(for: configuration)
        } catch {
            // handle error
        }
        // :code-block-end:
    }

    func testSetClientLogLevel() {
        // :code-block-start: set-log-level
        // Access your app
        let app = App(id: YOUR_REALM_APP_ID)

        // Access the sync manager for the app
        let syncManager = app.syncManager

        // Set the logger to provide debug logs
        syncManager.logLevel = .debug
        // :code-block-end:
    }
}
// :replace-end:
