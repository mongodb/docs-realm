import XCTest
import RealmSwift

class AccessMongoDB: XCTestCase {
    
    override func setUp() {
        let expectation = XCTestExpectation(description: "logs in")
        app.login(credentials: Credentials.anonymous) { (user, error) in
            guard error == nil else {
                fatalError("Login failed: \(error!.localizedDescription)")
            }
            expectation.fulfill()
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

    func testRemoteMongoDB() {
        let expectation = XCTestExpectation(description: "it completes")
        
        // :code-block-start: remote-mongodb
        // mongodb-atlas is the name of cluster service
        let client = app.currentUser!.mongoClient("mongodb-atlas")

        // Select the database
        let database = client.database(named: "tracker")

        // Select the collection
        let collection = database.collection(withName: "Task")
         
        // Using the user's id to look up tasks
        let user = app.currentUser!
        let identity = user.id

        // Run the query
        collection.find(filter: ["_partition": AnyBSON(identity)], { (results, error) in
            // Note: this completion handler may be called on a background thread.
            //       If you intend to operate on the UI, dispatch back to the main
            //       thread with `DispatchQueue.main.sync {}`.

            // Handle errors
            guard error == nil else {
                print("Call to MongoDB failed: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "no rule exists for namespace 'tracker.Task'")
                expectation.fulfill()
                // :hide-end:  
                return
            }
            // Print each document.
            print("Results:")
            results!.forEach({(document) in
                print("Document:")
                document.forEach({ (key, value) in
                    print("  key: \(key), value: \(value)")
                })
            })
        })
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

}
