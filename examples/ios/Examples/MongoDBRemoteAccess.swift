// :replace-start: {
//   "terms": {
//     "(testCase: self)": "()"
//   }
// }

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
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
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
            // :remove-start:
            XCTAssertNotNil(objectId)
            // :remove-end:
            print("Successfully inserted a document with id: \(objectId)")
        } catch {
            print("Call to MongoDB failed: \(error.localizedDescription)")
        }
        // :snippet-end:
    }

    func testInsertMany() {
        let expectation = XCTestExpectation(description: "Multiple documents are inserted")

        app.login(credentials: Credentials.anonymous) { (result) in // :emphasize:
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }

                let client = app.currentUser!.mongoClient("mongodb-atlas")

                let database = client.database(named: "ios") // :emphasize:

                let collection = database.collection(withName: "CoffeeDrinks")

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
                        // :remove-start:
                        XCTAssertEqual(objectIds.count, 3)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
                // :snippet-end:
            }
        }
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
                        // :remove-start:
                        XCTAssertNotNil(document)
                        expectation.fulfill()
                        // :remove-end:
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
                        // :remove-start:
                        XCTAssertEqual(documents.count, 2)
                        expectation.fulfill()
                        // :remove-end:
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
                        // :remove-start:
                        XCTAssertNotNil(count)
                        expectation.fulfill()
                        // :remove-end:
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
                        // :remove-start:
                        XCTAssertEqual(updateResult.matchedCount, 1)
                        XCTAssertEqual(updateResult.modifiedCount, 1)
                        expectation.fulfill()
                        // :remove-end:
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
                // :remove-start:
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
                // :remove-end:

                let documentUpdate: Document = ["$set": ["containsDairy": "true"]]
                collection.updateManyDocuments(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        print("Successfully updated \(updateResult.modifiedCount) documents.")
                        // :remove-start:
                        XCTAssertNotNil(updateResult.matchedCount)
                        XCTAssertNotNil(updateResult.modifiedCount)
                        expectation.fulfill()
                        // :remove-end:
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
                        // :remove-start:
                        XCTAssertNotNil(updateResult.objectId)
                        // :remove-end:
                        if updateResult.objectId != nil {
                            print("Successfully upserted a document with id: \(updateResult.objectId)")
                            // :remove-start:
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
                            // :remove-end:
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
                                // :remove-start:
                                XCTAssertEqual(deletedResult, 1)
                                expectation.fulfill()
                                // :remove-end:
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
                                // :remove-start:
                                XCTAssertEqual(deletedResult, 3)
                                expectation.fulfill()
                                // :remove-end:
                            }
                        }
                        // :snippet-end:
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    // :snippet-start: change-event-delegate
    class MyChangeStreamDelegate: ChangeEventDelegate {
        // :remove-start:
        private let testCase: XCTestCase
        private let openExpectation: XCTestExpectation
        private let closeExpectation: XCTestExpectation
        private var changeExpectation: XCTestExpectation?

        public init(testCase: XCTestCase) {
            self.testCase = testCase
            openExpectation = testCase.expectation(description: "Open watch stream")
            closeExpectation = testCase.expectation(description: "Close watch stream")
        }

        public func waitForOpen() {
            testCase.wait(for: [openExpectation], timeout: 20.0)
        }

        public func waitForClose() {
            testCase.wait(for: [closeExpectation], timeout: 20.0)
        }

        public func expectEvent() {
            XCTAssertNil(changeExpectation)
            changeExpectation = testCase.expectation(description: "Watch change event")
        }

        public func waitForEvent() throws {
            try testCase.wait(for: [XCTUnwrap(changeExpectation)], timeout: 20.0)
            changeExpectation = nil
        }
        // :remove-end:
        
        func changeStreamDidOpen(_ changeStream: RealmSwift.ChangeStream) {
            print("Change stream opened: \(changeStream)")
            openExpectation.fulfill() // :remove:
        }
        
        func changeStreamDidClose(with error: Error?) {
            if let anError = error {
                print("Change stream closed with error: \(anError.localizedDescription)")
            } else {
                print("Change stream closed")
            }
            closeExpectation.fulfill() // :remove:
        }
        
        func changeStreamDidReceive(error: Error) {
            print("Received error: \(error.localizedDescription)")
        }
        
        func changeStreamDidReceive(changeEvent: RealmSwift.AnyBSON?) {
            guard let changeEvent = changeEvent else { return }
            guard let document = changeEvent.documentValue else { return }
            print("Change event document received: \(document)")
            changeExpectation?.fulfill() // :remove:
        }
    }
    // :snippet-end:
    
    func testWatchForChangesInMDBCollection() {
        let expectation = XCTestExpectation(description: "Get notifications when documents are inserted")

        // :snippet-start: watch-collection
        app.login(credentials: Credentials.anonymous) { (result) in
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                
                // Set up the client, database, and collection.
                let client = app.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                
                // Watch the collection. In this example, we use a queue and delegate,
                // both of which are optional arguments.
                let queue = DispatchQueue(label: "io.realm.watchQueue")
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let changeStream = collection.watch(delegate: delegate, queue: queue)

                // :remove-start:
                delegate.waitForOpen()
                sleep(5)
                delegate.expectEvent()
                // :remove-end:
                // Adding a document triggers a change event.
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 42"]
                
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId) // :remove:
                        print("Successfully inserted a document with id: \(objectId)")
                    }
                    sleep(3) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(3)
                delegate.waitForClose()
                sleep(3)
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 75)
    }

    func testWatchForChangesInMDBCollectionWithFilter() {
        let expectation = XCTestExpectation(description: "Get a notification when a specific document is updated")

        // :snippet-start: watch-collection-with-filter
        app.login(credentials: Credentials.anonymous) { (result) in
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                
                // Set up the client, database, and collection.
                let client = app.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                // :remove-start:
                // Populate test data so we have something to watch
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 42"]
                var drinkObjectId: ObjectId = ObjectId()
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        let objectIdValue = objectId.objectIdValue
                        guard let unwrappedObjectIdValue = objectIdValue else { return }
                        drinkObjectId.self = unwrappedObjectIdValue
                    }
                    sleep(2)
                }
                sleep(3)
                // :remove-end:
                
                // Watch the collection. In this example, we use a queue and delegate,
                // both of which are optional arguments.
                // `filterIds` is an array of specific document ObjectIds you want to watch.
                let queue = DispatchQueue(label: "io.realm.watchQueue")
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let changeStream = collection.watch(filterIds: [drinkObjectId], delegate: delegate, queue: queue)

                // :remove-start:
                delegate.waitForOpen()
                sleep(3)
                delegate.expectEvent()
                // :remove-end:
                // An update to a relevant document triggers a change event.
                let queryFilter: Document = ["_id": AnyBSON(drinkObjectId) ]
                let documentUpdate: Document = ["$set": ["containsDairy": "true"]]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        XCTAssertNotNil(updateResult) // :remove:
                        print("Successfully updated the document")
                    }
                    sleep(5) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(3)
                delegate.waitForClose()
                sleep(3)
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 75)
    }
    
    func testWatchForChangesInMDBCollectionWithMatch() {
        let expectation = XCTestExpectation(description: "Get notifications for documents that match a filter")

        // :snippet-start: watch-collection-with-match
        app.login(credentials: Credentials.anonymous) { (result) in
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                
                // Set up the client, database, and collection.
                let client = app.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                // :remove-start:
                // Populate test data so we have something to watch
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 42"]
                var drinkObjectId: ObjectId = ObjectId()
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        let objectIdValue = objectId.objectIdValue
                        guard let unwrappedObjectIdValue = objectIdValue else { return }
                        drinkObjectId.self = unwrappedObjectIdValue
                    }
                    sleep(3)
                }
                sleep(3)
                // :remove-end:
                
                // Watch the collection. In this example, we use a queue and delegate,
                // both of which are optional arguments.
                let queue = DispatchQueue(label: "io.realm.watchQueue")
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let matchFilter = [ "fullDocument._partition": AnyBSON("Store 42") ]
                let changeStream = collection.watch(matchFilter: matchFilter, delegate: delegate, queue: queue)
                // :remove-start:
                sleep(3)
                delegate.waitForOpen()
                sleep(3)
                delegate.expectEvent()
                // :remove-end:
                // An update to a relevant document triggers a change event.
                let queryFilter: Document = ["_id": AnyBSON(drinkObjectId) ]
                let documentUpdate: Document = ["$set": ["containsDairy": "true"]]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        XCTAssertNotNil(updateResult) // :remove:
                        print("Successfully updated the document")
                    }
                    sleep(3) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(5)
                delegate.waitForClose()
                sleep(5)
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 75)
    }
    
#if swift(>=5.8)
    // Per Thomas in the SDK test suite:
    // wait(for:) doesn't work in async functions because it blocks the calling
    // thread and doesn't let async tasks run. Xcode 14.3 introduced a new async
    // version of it which does work, but there doesn't appear to be a workaround
    // for older Xcode versions.
    func testAsyncStreamWatchForChangesInMDBCollection() async throws {
        // :snippet-start: watch-collection-async-sequence
        let user = try await app.login(credentials: Credentials.anonymous)
        // Set up the client, database, and collection.
        let mongoClient = user.mongoClient("mongodb-atlas")
        let database = mongoClient.database(named: "ios")
        let collection = database.collection(withName: "CoffeeDrinks")
        // :remove-start:
        // Populate test data
        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 43"]
        let objectId = try await collection.insertOne(drink)
        XCTAssertNotNil(objectId) // :remove:
        print("Successfully inserted a document with id: \(objectId)")
        let objectIdValue = objectId.objectIdValue
        guard let unwrappedObjectIdValue = objectIdValue else { return }
        
        let openEx = expectation(description: "open watch stream")
        // :remove-end:
        
        // Set up a task you'll later await to keep the change stream open,
        // and you can cancel it when you're done watching for events.
        let task = Task {
            // Open the change stream.
            let changeEvents = collection.changeEvents(onOpen: {
                openEx.fulfill() // :remove:
                print("Successfully opened change stream")
            })
            // Await events in the change stream.
            for try await event in changeEvents {
                let doc = event.documentValue!
                // :remove-start:
                let objectId = doc["documentKey"]??.documentValue?["_id"]??.objectIdValue
                if let unwrappedObjectId = objectId {
                    XCTAssertEqual(unwrappedObjectId, objectIdValue)
                }
                // :remove-end:
                print("Received event: \(event.documentValue!)")
            }
        }
        await fulfillment(of: [openEx], timeout: 2.0) // :remove:
        
        // Updating a document in the collection triggers a change event.
        let queryFilter: Document = ["_id": AnyBSON(objectId) ]
        let documentUpdate: Document = ["$set": ["containsDairy": "true"]]
        try await collection.updateOneDocument(filter: queryFilter, update: documentUpdate)
        sleep(2) // :remove:
        // Cancel the task when you're done watching the stream.
        task.cancel()
        _ = await task.result
        // :snippet-end:
    }
#endif
}
// :replace-end:
