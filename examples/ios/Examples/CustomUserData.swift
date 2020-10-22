import XCTest
import RealmSwift

class CustomUserData: XCTestCase {

    func testCreateCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :code-block-start: create-custom-user-data
        let appId = YOUR_REALM_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                let client = user.mongoClient("mongodb-atlas")
                let database = client.database(named: "my_database")
                let collection = database.collection(withName: "users")

                // Insert the custom user data object
                collection.insertOne([
                    "userId": AnyBSON(user.id),
                    "favoriteColor": "pink"
                    ]) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to insert document: \(error.localizedDescription)")
                        // :hide-start:
                        XCTAssertEqual(error.localizedDescription, "no rule exists for namespace 'my_database.users'")
                        expectation.fulfill()
                        // :hide-end:
                    case .success(let newObjectId):
                        print("Inserted custom user data document with object ID: \(newObjectId)")
                    }
                }
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testReadCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :code-block-start: read-custom-user-data
        let appId = YOUR_REALM_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                // If the user data has been refreshed recently, you can access the
                // custom user data directly on the user object
                print("User custom data: \(user.customData)")

                // Refresh the custom user data
                user.refreshCustomData() { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to refresh custom data: \(error.localizedDescription)")
                    case .success(let customData):
                        // favoriteColor was set on the custom data.
                        print("Favorite color: \(customData["favoriteColor"] ?? "not set")")
                        // :hide-start:
                        expectation.fulfill()
                        // :hide-end:
                        return
                    }
                }
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testUpdateCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :code-block-start: update-custom-user-data
        let appId = YOUR_REALM_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                // Access the custom user document remotely to update it.
                let client = user.mongoClient("mongodb-atlas")
                let database = client.database(named: "my_database")
                let collection = database.collection(withName: "users")
                collection.updateOneDocument(
                    filter: ["userId": AnyBSON(user.id)],
                    update: ["favoriteColor": "cerulean"]
                ) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to update: \(error.localizedDescription)")
                        // :hide-start:
                        XCTAssertEqual(error.localizedDescription, "no rule exists for namespace 'my_database.users'")
                        expectation.fulfill()
                        // :hide-end:
                        return
                    case .success(let updateResult):
                        // User document updated.
                        print("Matched: \(updateResult.matchedCount), updated: \(updateResult.modifiedCount)")
                    }
                }
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

}
