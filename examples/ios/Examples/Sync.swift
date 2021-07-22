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
        // :code-block-start: login-and-open-synced-realm
        // Instantiate the app using your Realm app ID
        let app = App(id: YOUR_REALM_APP_ID)
        // Authenticate with the instance of the app that points
        // to your backend. Here, we're using anonymous login.
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
            }
        }
        // Assign user to the entity currently authenticated with
        // this instance of your app.
        let user = app.currentUser
        // Specify which data this authenticated user should
        // be able to access.
        let partitionValue = "some partition value"
        // Store a configuration that consists of the current user,
        // authenticated to this instance of your app, who should be
        // able to access this data (partition).
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :hide-start:
        // The following is only required if you want to specify exactly which
        // types to include in the realm. By default, Realm automatically finds
        // all subclasses of Object and EmbeddedObject to add to the realm.
        configuration.objectTypes = [SyncExamples_Task.self]
        // :hide-end:
        // Open a Realm asynchronously with this configuration. This
        // downloads any changes to the synced Realm from the server
        // before opening it. If this is the first time opening this
        // synced Realm, it downloads the entire Realm to disk before
        // opening it.
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

        // :code-block-start: open-synced-realm-offline
        // You can use the same configuration from the initial open to
        // re-open a Realm that is already on the device immediately.
        // This doesn't wait to download changes from the server.
        // Changes will attempt to sync in the background, but will
        // not block opening the Realm.
        let realm = try! Realm(configuration: configuration)
        print("Opened realm: \(realm)")
        // :code-block-end:

        // :code-block-start: always-use-async-open
        // If you want to always download changes from the
        // server before opening a realm, you can use asyncOpen
        // exclusively; not just the first time you open a synced
        // Realm. This only works when the user is online.
        Realm.asyncOpen(configuration: configuration) { result in
            switch result {
            case .failure(let error):
                print("Failed to open realm: \(error.localizedDescription)")
                // Handle error
            case .success(let realm):
                print("Successfully opened realm: \(realm)")
                // Use realm
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
        }
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

        // Observe using Combine
        let cancellable = syncSession.publisher(for: \.connectionState)
            .sink { connectionState in
                switch connectionState {
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
        expectation.assertForOverFulfill = false

        // :code-block-start: check-progress
        let syncSession = syncedRealm.syncSession!
        let token = syncSession.addProgressNotification(
            for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in

            let transferredBytes = progress.transferredBytes
            let transferrableBytes = progress.transferrableBytes
            let transferPercent = progress.fractionTransferred * 100

            print("Uploaded \(transferredBytes)B / \(transferrableBytes)B (\(transferPercent)%)")
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
            // before deleting the files
        }
        do {
            let app = App(id: YOUR_REALM_APP_ID)
            var configuration = app.currentUser!.configuration(partitionValue: "some partition value")
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
