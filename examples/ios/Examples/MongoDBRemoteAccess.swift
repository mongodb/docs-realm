import XCTest
import RealmSwift

// :snippet-start: coffee-drink-model
class CoffeeDrink: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var beanRegion: String?
    @Persisted var containsDairy: Bool
    @Persisted var _partition: String
}
// :snippet-end:

class MongoDBRemoteAccessTestCase: XCTestCase {

    func testInsertOne() {
        let expectation = XCTestExpectation(description: "A document is inserted")

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

                // :snippet-start: insert-one
                // This document represents a CoffeeDrink object
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 43"]

                // Insert the document into the collection
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        // Success returns the objectId for the inserted document
                        print("Successfully inserted a document with id: \(objectId)")
                        // :hide-start:
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAsyncAwaitInsert() async {
        do {
            // Use the async method to login
            let user = try await app.login(credentials: Credentials.anonymous)
            print("Login as \(user) succeeded!")
        } catch {
            print("Login failed: \(error.localizedDescription)")
        }

        // mongodb-atlas is the cluster service name
        let client = app.currentUser!.mongoClient("mongodb-atlas")

        // Select the database
        let database = client.database(named: "ios")

        // Select the collection
        let collection = database.collection(withName: "CoffeeDrinks")

        // :snippet-start: async-await-insert
        // This document represents a CoffeeDrink object
        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 43"]

        do {
            // Use the async collection method to insert the document
            let objectId = try await collection.insertOne(drink)
            // :hide-start:
            XCTAssertNotNil(objectId)
            // :hide-end:
            print("Successfully inserted a document with id: \(objectId)")
        } catch {
            print("Call to MongoDB failed: \(error.localizedDescription)")
        }
        // :snippet-end:
    }

    func testInsertMany() {
        let expectation = XCTestExpectation(description: "Multiple documents are inserted")

        // :snippet-start: insert-sample-data
        app.login(credentials: Credentials.anonymous) { (result) in // :emphasize:
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            // :emphasize-start:
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                // :emphasize-end:
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas") // :emphasize:

                // Select the database
                let database = client.database(named: "ios") // :emphasize:

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks") // :emphasize:

                // :snippet-start: insert-many
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 42"]
                let drink2: Document = [ "name": "Maple Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": "true", "_partition": "Store 42"]
                let drink3: Document = [ "name": "Bean of the Day", "beanRegion": "San Marcos, Guatemala", "containsDairy": "false", "_partition": "Store 47"]

                // Insert the documents into the collection
                collection.insertMany([drink, drink2, drink3]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        // :hide-start:
                        XCTAssertEqual(objectIds.count, 3)
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testFindOneDocument() {
        let expectation = XCTestExpectation(description: "A single document is returned")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: find-one
                let queryFilter: Document = ["name": "Maple Latte"]

                collection.findOneDocument(filter: queryFilter) { result in

                    switch result {
                    case .failure(let error):
                        print("Did not find matching documents: \(error.localizedDescription)")
                        return
                    case .success(let document):
                        print("Found a matching document: \(document)")
                        // :hide-start:
                        XCTAssertNotNil(document)
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testFindManyDocuments() {
        let expectation = XCTestExpectation(description: "Two documents are returned")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: find-many
                let queryFilter: Document = ["name": "Americano"]

                collection.find(filter: queryFilter) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let documents):
                        print("Results: ")
                        for document in documents {
                            print("Coffee drink: \(document)")
                        }
                        // :hide-start:
                        XCTAssertEqual(documents.count, 2)
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testCountDocuments() {
        let expectation = XCTestExpectation(description: "Returns a count of documents")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: count
                let queryFilter: Document = ["name": "Bean of the Day"]

                collection.count(filter: queryFilter) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let count):
                        print("Found this many documents in the collection matching the filter: \(count)")
                        // :hide-start:
                        XCTAssertNotNil(count)
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testUpdateOneDocument() {
        let expectation = XCTestExpectation(description: "Updates a single document")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: update-one
                let queryFilter: Document = ["name": "Bean of the Day", "_partition": "Store 42"]
                let documentUpdate: Document = ["$set": ["containsDairy": "true"]]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        if updateResult.matchedCount == 1 && updateResult.modifiedCount == 1 {
                            print("Successfully updated a matching document.")
                        } else {
                            print("Did not update a document")
                        }
                        // :hide-start:
                        XCTAssertEqual(updateResult.matchedCount, 1)
                        XCTAssertEqual(updateResult.modifiedCount, 1)
                        expectation.fulfill()
                        // :hide-end:
                    }
                // :snippet-end:
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testUpdateManyDocuments() {
        let expectation = XCTestExpectation(description: "Updates many documents")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: update-many
                let queryFilter: Document = ["name": "Bean of the Day"]
                // :hide-start:
                // Set initial values so there's something to update
                let setDefaults: Document = ["$set": ["containsDairy": "false"]]
                collection.updateManyDocuments(filter: queryFilter, update: setDefaults) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let result):
                        XCTAssertNotNil(result.matchedCount)
                        XCTAssertNotNil(result.modifiedCount)
                        print("Successfully set defaults for \(result.modifiedCount) documents.")
                    }
                }
                // :hide-end:

                let documentUpdate: Document = ["$set": ["containsDairy": "true"]]
                collection.updateManyDocuments(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        print("Successfully updated \(updateResult.modifiedCount) documents.")
                        // :hide-start:
                        XCTAssertNotNil(updateResult.matchedCount)
                        XCTAssertNotNil(updateResult.modifiedCount)
                        expectation.fulfill()
                        // :hide-end:
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testUpsertDocuments() {
        let expectation = XCTestExpectation(description: "Upsert, then delete a document")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: upsert
                let queryFilter: Document = ["name": "Bean of the Day", "_partition": "Store 55"]
                let documentUpdate: Document = ["name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": "false", "_partition": "Store 55"]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate, upsert: true) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        // :hide-start:
                        XCTAssertNotNil(updateResult.objectId)
                        // :hide-end:
                        if updateResult.objectId != nil {
                            print("Successfully upserted a document with id: \(updateResult.objectId)")
                            // :hide-start:
                            // Delete the document so the test will pass next time
                            collection.deleteOneDocument(filter: documentUpdate) { deletedResult in
                                switch deletedResult {
                                case .failure(let error):
                                    print("Failed to delete newly upserted document: \(error.localizedDescription)")
                                    return
                                case .success(let deletedResult):
                                    XCTAssertEqual(deletedResult, 1)
                                    print("Successfully deleted upserted document")
                                    expectation.fulfill()
                                }
                            }
                            // :hide-end:
                        } else {
                            print("Did not upsert a document")
                        }
                    }
                }
                // :snippet-end:
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testDeleteOneDocument() {
        let expectation = XCTestExpectation(description: "Insert, then delete a document")

        app.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                // mongodb-atlas is the cluster service name
                let client = app.currentUser!.mongoClient("mongodb-atlas")

                // Select the database
                let database = client.database(named: "ios")

                // Select the collection
                let collection = database.collection(withName: "CoffeeDrinks")

                // Insert a document so we can delete it. This query filter and document
                // duplicate what is visible in the code block, but was at the wrong level
                // of indent when starting the code block here, so we've declared it again
                // in the code snippet with a slightly different name.
                let document: Document = ["name": "Mocha", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": "true", "_partition": "Store 17"]
                collection.insertOne(document) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        // :snippet-start: delete-one
                        let queryFilter: Document = ["name": "Mocha", "_partition": "Store 17"]
                        collection.deleteOneDocument(filter: queryFilter) { deletedResult in
                            switch deletedResult {
                            case .failure(let error):
                                print("Failed to delete a document: \(error.localizedDescription)")
                                return
                            case .success(let deletedResult):
                                print("Successfully deleted a document.")
                                // :hide-start:
                                XCTAssertEqual(deletedResult, 1)
                                expectation.fulfill()
                                // :hide-end:
                            }
                        }
                        // :snippet-end:
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testDeleteManyDocuments() {
        let expectation = XCTestExpectation(description: "Insert and then delete multiple documents")

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

                let drink: Document = [ "name": "Caramel Latte", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 22"]
                let drink2: Document = [ "name": "Caramel Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": "true", "_partition": "Store 24"]
                let drink3: Document = [ "name": "Caramel Latte", "beanRegion": "San Marcos, Guatemala", "containsDairy": "false", "_partition": "Store 35"]

                // Insert the example data into the collection
                collection.insertMany([drink, drink2, drink3]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 3)
                        // :snippet-start: delete-many
                        let filter: Document = ["name": "Caramel Latte"]

                        collection.deleteManyDocuments(filter: filter) { deletedResult in
                            switch deletedResult {
                            case .failure(let error):
                                print("Failed to delete a document: \(error.localizedDescription)")
                                return
                            case .success(let deletedResult):
                                print("Successfully deleted \(deletedResult) documents.")
                                // :hide-start:
                                XCTAssertEqual(deletedResult, 3)
                                expectation.fulfill()
                                // :hide-end:
                            }
                        }
                        // :snippet-end:
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

//    TODO: Write examples for watching for changes
//
//    func testWatchForChangesInMDBCollection() {
//
//    }
//
//    func testWatchForChangesInMDBCollectionWithFilter() {
//
//    }
}
