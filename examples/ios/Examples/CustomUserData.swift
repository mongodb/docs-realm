import XCTest
import RealmSwift

class CustomUserData: XCTestCase {
    
    func testCreateCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")
        
        // :code-block-start: create-custom-user-data
        let appId = YOUR_REALM_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (user, error) in
            guard error == nil else {
                print("Failed to log in: \(error!.localizedDescription)")
                return
            }
            let client = user!.mongoClient("mongodb-atlas")
            let database = client.database(named: "my_database")
            let collection = database.collection(withName: "users")

            // Insert the custom user data object
            collection.insertOne([
                "userId": AnyBSON(user!.id),
                "favoriteColor": "pink"
            ]) { (newObjectId, error) in
                  guard error == nil else {
                      print("Failed to insert document: \(error!.localizedDescription)")
                      // :hide-start:
                      XCTAssertEqual(error!.localizedDescription, "no rule exists for namespace 'my_database.users'")
                      expectation.fulfill()
                      // :hide-end:
                      return
                  }
                  print("Inserted custom user data document with object ID: \(newObjectId!)")
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
        app.login(credentials: Credentials.anonymous) { (user, error) in
            guard error == nil else {
                print("Failed to log in: \(error!.localizedDescription)")
                return
            }

            // If the user data has been refreshed recently, you can access the
            // custom user data directly on the user object
            print("User custom data: \(user!.customData)")

            // Refresh the custom user data
            user!.refreshCustomData() { (customData, error) in
                guard error == nil else {
                    print("Failed to refresh custom data: \(error!.localizedDescription)")
                    return
                } 
                guard let customData = customData else {
                    // This may happen if no custom data was set for the user id.
                    // It could also be caused by not having custom data enabled and
                    // configured correctly!
                    print("Custom data not set")
                    return
                }
                // favoriteColor was set on the custom data.
                print("Favorite color: \(customData["favoriteColor"] ?? "not set")")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
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
        app.login(credentials: Credentials.anonymous) { (user, error) in
            guard error == nil else {
                print("Failed to log in: \(error!.localizedDescription)")
                return
            }
            
            // Access the custom user document remotely to update it.
            let client = user!.mongoClient("mongodb-atlas")
            let database = client.database(named: "my_database")
            let collection = database.collection(withName: "users")
            collection.updateOneDocument(
                filter: ["userId": AnyBSON(user!.id)],
                update: ["favoriteColor": "cerulean"]
            ) { (updateResult, error) in
                  guard error == nil else {
                      print("Failed to update: \(error!.localizedDescription)")
                      // :hide-start:
                      XCTAssertEqual(error!.localizedDescription, "no rule exists for namespace 'my_database.users'")
                      expectation.fulfill()
                      // :hide-end:
                      return
                  }
                  
                  // User document updated. 
                  print("Matched: \(updateResult!.matchedCount), updated: \(updateResult!.modifiedCount)")
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
    
}
