app.login(credentials: Credentials.anonymous) { (result) in
    DispatchQueue.main.async {
        switch result {
        case .failure(let error):
            print("Login failed: \(error)")
        case .success(let user):
            print("Login as \(user) succeeded!")
            // Continue below
        }
        
        let client = app.currentUser!.mongoClient("mongodb-atlas")

        let database = client.database(named: "ios")

        let collection = database.collection(withName: "CoffeeDrinks")
        
        let queue = DispatchQueue(label: "io.realm.watchQueue")
        let delegate =  MyChangeStreamDelegate()
        let changeStream = collection.watch(delegate: delegate, queue: queue)

        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": "false", "_partition": "Store 42"]

        
        
        collection.insertOne(drink) { result in
            switch result {
            case .failure(let error):
                print("Call to MongoDB failed: \(error.localizedDescription)")
                return
            case .success(let objectId):
                XCTAssertNotNil(objectId)
                print("Successfully inserted a document with id: \(objectId)")
            }
        }
        changeStream.close()
    }
}
