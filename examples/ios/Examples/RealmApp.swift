// swiftlint:disable identifier_name

import XCTest
// :snippet-start: import-realm
import RealmSwift
// :snippet-end:

let YOUR_APP_SERVICES_APP_ID = "example-testers-kvjdy"

// :snippet-start: init-realm-app-client
let app = App(id: YOUR_APP_SERVICES_APP_ID) // replace YOUR_APP_SERVICES_APP_ID with your App ID
// :snippet-end:

class RealmAppTest: XCTestCase {
    func testRealmAppWithConfig() {
        // :snippet-start: realm-app-config
        let configuration = AppConfiguration(
           baseURL: "https://realm.mongodb.com", // Custom base URL
           transport: nil, // Custom RLMNetworkTransportProtocol
           localAppName: "My App",
           localAppVersion: "3.14.159",
           defaultRequestTimeoutMS: 30000
        )

        let app = App(id: "my-app-services-app-id", configuration: configuration)
        // :snippet-end:
        print(app)
    }
    
    func testAppConfigEnableSessionMultiplexing() async {
        // :snippet-start: app-config-enable-session-multiplexing
        let configuration = AppConfiguration(enableSessionMultiplexing: false)

        let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)
        // :snippet-end:
        do {
            // Testing that this configuration uses a single connection is not simple
            // So we're just confirming that the app configuration is valid and a user
            // can login and relying on the SDK to actually test this functionality.
            let user = try await app.login(credentials: Credentials.anonymous)
            XCTAssert(app.currentUser != nil)
        } catch {
            print("Failed to authenticate user: \(error.localizedDescription)")
        }
    }
    
    func testAppConfigSyncTimeoutOptions() async {
        // :snippet-start: app-config-sync-timeout
        let syncTimeoutOptions = SyncTimeoutOptions(
            connectTimeout: 30000,
            connectionLingerTime: 5000,
            pingKeepalivePeriod: 10000,
            pongKeepaliveTimeout: 10000,
            fastReconnectLimit: 30000
        )
        let configuration = AppConfiguration(syncTimeouts: syncTimeoutOptions)

        let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)
        // :snippet-end:
        do {
            // Testing all of these options properly would require many different tests
            // So we're just confirming that the app configuration is valid and a user
            // can login and relying on the SDK to actually test this functionality.
            let user = try await app.login(credentials: Credentials.anonymous)
            XCTAssert(app.currentUser != nil)
        } catch {
            print("Failed to authenticate user: \(error.localizedDescription)")
        }
    }
    
    override func tearDown() {
        guard app.currentUser != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "logout completes")
        app.currentUser?.logOut { (error) in
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 10)
    }
}
