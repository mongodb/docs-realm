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
    func testAsyncOpenSyncedRealm() throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: login-asyncopen-synced-realm
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

        // :code-block-start: use-async-open-with-cached-credentials
        // Use asyncOpen to sync changes with the backend before
        // opening the realm. This only works when the user is online,
        // so first, check for a network connection.
        let syncedRealm = try! Realm(configuration: configuration)
        let syncSession = syncedRealm.syncSession!
        let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
            switch syncSession.connectionState {
            case .connecting:
                print("Connecting...")
            case .connected:
                print("Connected")
                // After the user is connected, use `asyncOpen`
                // to sync changes before opening the realm.
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
            case .disconnected:
                // Let the user know they can't use the app
                // as they are not currently connected. Alternately,
                // you could fall back to `init` open if the user
                // is offline.
                print("Can't open the app because there is no network connection.")
            default:
                break
            }
        }
        // :code-block-end:

        wait(for: [expectation], timeout: 10)
    }

    func testInitOpenSyncedRealm() throws {
        // :code-block-start: login-and-init-synced-realm
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
        // Initialize a synced realm on device with this configuration.
        // Changes will attempt to sync in the background, but will
        // not block opening the realm.
        let realm = try! Realm(configuration: configuration)
        print("Opened realm: \(realm)")
        // :code-block-end:

        // :code-block-start: open-synced-realm-offline
        // Check to see if you have a logged-in user.
        if app.currentUser != nil {
            // If you have logged-in user credentials, open the realm.
            let offlineRealm = try! Realm(configuration: configuration)
            print("Opened realm: \(realm)")
        } else {
            // If the user is not logged in, proceed to the login flow.
            print("Current user is not logged in.")
        }
        // :code-block-end:
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
