import XCTest
import RealmSwift

class AccessMongoDB: AnonymouslyLoggedInTestCase {
    func testRemoteMongoDB() {
        let expectation = XCTestExpectation(description: "it completes")
        
        // :code-block-start: remote-mongodb
        // mongodb-atlas is the cluster service name
        let client = app.currentUser!.mongoClient("mongodb-atlas")

        // Select the database
        let database = client.database(named: "tracker")

        // Select the collection
        let collection = database.collection(withName: "Task")
         
        // Using the user's id to look up tasks
        let user = app.currentUser!
        let identity = user.id

        // Run the query
        collection.find(filter: ["_partition": AnyBSON(identity)], { (result) in
            // Note: this completion handler may be called on a background thread.
            //       If you intend to operate on the UI, dispatch back to the main
            //       thread with `DispatchQueue.main.async {}`.
            switch result {
            case .failure(let error):
                // Handle errors
                print("Call to MongoDB failed: \(error.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error.localizedDescription, "no rule exists for namespace 'tracker.Task'")
                expectation.fulfill()
                // :hide-end:  
                return
            case .success(let documents):
                // Print each document
                print("Results:")
                documents.forEach({(document) in
                    print("Document:")
                    document.forEach({ (key, value) in
                        print("  key: \(key), value: \(value!)")
                    })
                })
            }
        })
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

}
