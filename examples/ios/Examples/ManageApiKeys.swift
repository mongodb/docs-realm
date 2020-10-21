import XCTest
import RealmSwift

class ManageApiKeys: XCTestCase {
    override func setUp() {
        let expectation = XCTestExpectation(description: "logs in")
        let email = "api-key-user@example.com"
        let password = "123456"

        // User will be deleted by TestSetup after entire suite 
        app.emailPasswordAuth.registerUser(email: email, password: password) { (error) in
            // Ignore "name already in use" error as it may have been created by a previous test in this suite
            guard error == nil || error!.localizedDescription == "name already in use" else {
                fatalError("User registration failed: \(error!.localizedDescription)")
            }
            app.login(credentials: Credentials.emailPassword(email: email, password: password)) { (result) in
                switch result {
                case .failure(let error):
                    fatalError("Login failed: \(error.localizedDescription)")
                case .success(_):
                    expectation.fulfill()
                }
            }
        }

        wait(for: [expectation], timeout: 10)
    }

    override func tearDown() {
        let expectation = XCTestExpectation(description: "logs out")
        app.currentUser!.logOut { (error) in
            guard error == nil else {
                fatalError("Failed to log out: \(error!.localizedDescription)")
            }
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 10)
    }

    func testCreateApiKey() {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: create-api-key
        let app = App(id: YOUR_REALM_APP_ID)

        // ... log in ...

        // User must not be an anonymous user.
        let user = app.currentUser!
        let client = user.apiKeysAuth

        client.createAPIKey(named: "someKeyName") { (apiKey, error) in
            guard error == nil else {
                print("Failed to create key: \(error!)")
                return
            }
            // Use apiKey
            // :hide-start:
            client.deleteAPIKey(apiKey!.objectId) { (error) in
                expectation.fulfill()
            }
            // :hide-end:
        }

        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testLookUpApiKey() {
        let singleFetchExpectation = XCTestExpectation(description: "single fetch completes")
        let fetchAllExpectation = XCTestExpectation(description: "fetch all completes")
        // :code-block-start: look-up-api-key
        let app = App(id: YOUR_REALM_APP_ID)

        // ... log in ...

        let user = app.currentUser!
        let client = user.apiKeysAuth

        // Fetch a specific API key by ObjectId
        client.fetchAPIKey(ObjectId("00112233445566778899aabb")) { (maybeApiKey, error) in
            // ...
            // :hide-start:
            singleFetchExpectation.fulfill()
            // :hide-end:
        }

        // Fetch all API keys
        client.fetchAPIKeys { (keys, error) in
            guard error == nil else {
                fatalError("Failed to fetch keys: \(error!)")
            }
            for key in keys! {
                // use key
                print(key.name)
            }
            // :hide-start:
            fetchAllExpectation.fulfill()
            // :hide-end:
        }
        // :code-block-end:
        wait(for: [singleFetchExpectation, fetchAllExpectation], timeout: 10)
    }

    func testEnableDisableApiKey() {
        let enableExpectation = XCTestExpectation(description: "enable completes")
        let disableExpectation = XCTestExpectation(description: "disable completes")

        // :code-block-start: enable-disable-api-key
        let app = App(id: YOUR_REALM_APP_ID)

        // ... log in ...

        let user = app.currentUser!

        let client = user.apiKeysAuth

        // Enable the API key
        client.enableAPIKey(ObjectId("00112233445566778899aabb")) { (error) in
            // ...
            // :hide-start:
            enableExpectation.fulfill()
            // :hide-end:
        }

        let apiKey: UserAPIKey?
        
        // ... Obtain a user API key ...
        // :hide-start:
        apiKey = UserAPIKey()
        // :hide-end:
        
        // Disable the API key
        client.disableAPIKey(apiKey!.objectId) { (error) in
            // ...
            // :hide-start:
            disableExpectation.fulfill()
            // :hide-end:
        }

        // :code-block-end:
        wait(for: [enableExpectation, disableExpectation], timeout: 10)
    }

    func testDeleteApiKey() {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: delete-api-key
        let app = App(id: YOUR_REALM_APP_ID)

        // ... log in ...

        let user = app.currentUser!
        let client = user.apiKeysAuth
        
        let apiKey: UserAPIKey?
        
        // ... Obtain a user API key ...
        // :hide-start:
        apiKey = UserAPIKey()
        // :hide-end:
        
        client.deleteAPIKey(apiKey!.objectId) { (error) in
            guard error == nil else {
                print("Failed to delete key: \(error!)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "API key not found")
                expectation.fulfill()
                // :hide-end:
                return
            }
            // Key deleted
        }
        // :code-block-end:

        wait(for: [expectation], timeout: 10)
    }
}
