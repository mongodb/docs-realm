import XCTest
import RealmSwift

class MongoDBRemoteAccessAggregationTestCase: XCTestCase {
    func testAggregationMatch() {
        let expectation = XCTestExpectation(description: "Run aggregation to find matching documents")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: aggregation-match
                let pipeline: [Document] = [["$match": ["partition": ["$eq": "Store 42"]]]]

                collection.aggregate(pipeline: pipeline) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to aggregate: \(error.localizedDescription)")
                        return
                    case .success(let documents):
                        print("Successfully ran the aggregation:")
                        for document in documents {
                            print("Coffee drink: \(document)")
                        }
                        // :remove-start:
                        XCTAssertNotNil(documents)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAggregationGroup() {
        let expectation = XCTestExpectation(description: "Run aggregation to group documents")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: aggregation-group
                let pipeline: [Document] = [["$group": ["_id": "$partition", "numItems": ["$sum": 1]]]]

                collection.aggregate(pipeline: pipeline) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to aggregate: \(error.localizedDescription)")
                        return
                    case .success(let results):
                        print("Successfully ran the aggregation.")
                        for result in results {
                            print(result)
                        }
                        // :remove-start:
                        XCTAssertNotNil(results)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAggregationProject() {
        let expectation = XCTestExpectation(description: "Run aggregation to project")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: aggregation-project
                let pipeline: [Document] = [["$project": ["_id": 0, "name": 1, "storeNumber": ["$arrayElemAt": [["$split": ["$partition", " "]], 1]]]]]

                collection.aggregate(pipeline: pipeline) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to aggregate: \(error.localizedDescription)")
                        return
                    case .success(let results):
                        print("Successfully ran the aggregation.")
                        for result in results {
                            print(result)
                        }
                        // :remove-start:
                        XCTAssertNotNil(results)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAggregationAddFields() {
        let expectation = XCTestExpectation(description: "Run aggregation to add the storeNumber field")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: aggregation-add-fields
                let pipeline: [Document] = [["$addFields": ["storeNumber": ["$arrayElemAt": [["$split": ["$partition", " "]], 1]]]]]

                collection.aggregate(pipeline: pipeline) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to aggregate: \(error.localizedDescription)")
                        return
                    case .success(let results):
                        print("Successfully ran the aggregation.")
                        for result in results {
                            print(result)
                        }
                        // :remove-start:
                        XCTAssertNotNil(results)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAggregationUnwind() {
        let expectation = XCTestExpectation(description: "Run aggregation to unwind")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: aggregation-unwind
                let pipeline: [Document] = [["$unwind": ["path": "$featuredInPromotions", "includeArrayIndex": "itemIndex"]]]

                collection.aggregate(pipeline: pipeline) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to aggregate: \(error.localizedDescription)")
                        return
                    case .success(let results):
                        print("Successfully ran the aggregation.")
                        for result in results {
                            print("Coffee drink: \(result)")
                        }
                        // :remove-start:
                        XCTAssertNotNil(results)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }
}
