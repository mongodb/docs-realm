import XCTest
// :snippet-start: import-realm
import RealmSwift
// :snippet-end:

let YOUR_REALM_APP_ID = "example-testers-kvjdy"

// :snippet-start: init-realm-app-client
let app = App(id: YOUR_REALM_APP_ID) // replace YOUR_REALM_APP_ID with your App ID
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

        let app = App(id: "my-realm-app-id", configuration: configuration)
        // :snippet-end:
        print(app)
    }
}
