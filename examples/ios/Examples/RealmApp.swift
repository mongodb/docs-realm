import XCTest
// :code-block-start: import-realm
import RealmSwift
// :code-block-end:

let YOUR_REALM_APP_ID = "example-testers-kvjdy"

// :code-block-start: init-realm-app-client
let app = App(id: YOUR_REALM_APP_ID) // replace YOUR_REALM_APP_ID with your App ID
// :code-block-end:

class RealmAppTest : XCTestCase {
    func testRealmAppWithConfig() {
        // :code-block-start: realm-app-config
        let configuration = AppConfiguration(
           baseURL: "https://realm.mongodb.com", // Custom base URL
           transport: nil, // Custom RLMNetworkTransportProtocol
           localAppName: "My App",
           localAppVersion: "3.14.159",
           defaultRequestTimeoutMS:30000
        );

        let app = App(id: "my-realm-app-id", configuration: configuration)
        // :code-block-end:
        print(app)
    }
}
