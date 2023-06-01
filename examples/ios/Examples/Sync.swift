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

    func testAsyncAwaitOpenRealm() async throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: open-synced-realm
        // Get a user. If there is already a logged in user,
        // return that user. If not, log in.
        func getUser() async throws -> User {
            // Check for a logged-in user
            if app.currentUser != nil {
                return app.currentUser!
            } else {
                // Instantiate the app using your Realm app ID
                let app = App(id: YOUR_APP_SERVICES_APP_ID)
                // Authenticate with the instance of the app that points
                // to your backend. Here, we're using anonymous login.
                let loggedInUser = try await app.login(credentials: Credentials.anonymous)
                return loggedInUser
            }
        }

        // Establish the user, define the config, and
        // return a realm for that user
        func getRealm() async throws -> Realm {
            // Get a logged-in app user
            let user = try await getUser()
            // Specify which data this authenticated user should
            // be able to access.
            let partitionValue = "some partition value"
            // Store a configuration that consists of the current user,
            // authenticated to this instance of your app, who should be
            // able to access this data (partition).
            var configuration = user.configuration(partitionValue: partitionValue)
            // :remove-start:
            configuration.objectTypes = [SyncExamples_Task.self]
            // :remove-end:
            // Open a Realm with this configuration.
            let realm = try await Realm(configuration: configuration)
            print("Successfully opened realm: \(realm)")
            return realm
        }

        // Get a realm
        let realm = try await getRealm()
        // Do something with the realm
        print("The open realm is: \(realm)")
        // :snippet-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    // :snippet-start: specify-download-behavior
    func testSpecifyDownloadBehavior() async throws {
        // :remove-start:
        let expectation = XCTestExpectation(description: "it completes")
        // :remove-end:
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let user = try await app.login(credentials: Credentials.anonymous)
        let partitionValue = "some partition value"
        var configuration = user.configuration(partitionValue: partitionValue)
        // :remove-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        let realm = try await Realm(configuration: configuration, downloadBeforeOpen: .always) // :emphasize:
        print("Successfully opened realm after downloading: \(realm)")
        // :remove-start:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
        // :remove-end:
    }
    // :snippet-end:

    func testLegacyAsyncOpenSyncedRealm() throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: login-asyncopen-synced-realm
        // Instantiate the app using your Realm app ID
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
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
        // :remove-start:
        // The following is only required if you want to specify exactly which
        // types to include in the realm. By default, Realm automatically finds
        // all subclasses of Object and EmbeddedObject to add to the realm.
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
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
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:

        // :snippet-start: use-async-open-with-cached-credentials
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
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
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
        // :snippet-end:

        wait(for: [expectation], timeout: 10)
    }

    func testLegacyInitOpenSyncedRealm() throws {
        // :snippet-start: login-and-init-synced-realm
        // Instantiate the app using your Realm app ID
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
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
        // :remove-start:
        // The following is only required if you want to specify exactly which
        // types to include in the realm. By default, Realm automatically finds
        // all subclasses of Object and EmbeddedObject to add to the realm.
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        // Initialize a synced realm on device with this configuration.
        // Changes will attempt to sync in the background, but will
        // not block opening the realm.
        let realm = try! Realm(configuration: configuration)
        print("Opened realm: \(realm)")
        // :snippet-end:

        // :snippet-start: open-synced-realm-offline
        // Check to see if you have a logged-in user.
        if app.currentUser != nil {
            // If you have logged-in user credentials, open the realm.
            let offlineRealm = try! Realm(configuration: configuration)
            print("Opened realm: \(realm)")
        } else {
            // If the user is not logged in, proceed to the login flow.
            print("Current user is not logged in.")
        }
        // :snippet-end:
    }

    func testPauseResumeSyncSession() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        // Log in...
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :remove-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        let syncedRealm = try! Realm(configuration: configuration)

        // :snippet-start: pause-resume-sync-session
        let syncSession = syncedRealm.syncSession!
        // Suspend synchronization
        syncSession.suspend()

        // Later, resume synchronization
        syncSession.resume()
        // :snippet-end:

        // :snippet-start: check-network-connection
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
        // :snippet-end:
    }

    func testCheckProgress() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :remove-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        let syncedRealm = try! Realm(configuration: configuration)
        let expectation = XCTestExpectation(description: "it completes")
        expectation.assertForOverFulfill = false

        // :snippet-start: check-progress
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
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testSetClientLogLevelDeprecated() {
        // :snippet-start: set-log-level-deprecated
        // This code example shows how to set the log level
        // in Realm Swift 10.38.3 and lower. For 10.39.0 and higher,
        // use the `Logger` API.
        // Access your app
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        // Access the sync manager for the app
        let syncManager = app.syncManager

        // Set the logger to provide debug logs
        syncManager.logLevel = .debug
        // :snippet-end:
    }
    
    // Skipping this test in CI because it fails when you run it with the other tests
    // with the error: `testSetCustomLogger(): std::logic_error: Cannot set the logger_factory after creating the sync client`
    // Running it by itself works.
    func testSetCustomLogger() {
        // This is an arbitrary struct that mimics the call structure of the
        // example that the SDK engineer provided in the HELP ticket.
        // Adding this here lets me remove the client-specific logger
        // for a generic implementation that uses the exact same call structure.
        struct AnalyticsProvider {
            struct shared {
                struct logEvent {
                    var event: String
                    var category: String
                    
                    init(_ event: String, category: String) {
                        self.event = event
                        self.category = category
                    }
                }
            }
        }
        // :snippet-start: set-custom-logger-deprecated
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        // Access the sync manager for the app
        let syncManager = app.syncManager
        
        // Set the logger to provide debug logs
        syncManager.logLevel = .all
        syncManager.logger = { logLevel, message in
            AnalyticsProvider.shared.logEvent("\(logLevel) : \(message)", category: "Engineering debugging")
        }
        // :snippet-end:
    }
}
// :replace-end:
