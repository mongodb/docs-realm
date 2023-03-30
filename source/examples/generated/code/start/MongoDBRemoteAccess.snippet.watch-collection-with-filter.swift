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
        let changeStream = collection.watch(filterIds: [drinkObjectId], delegate: delegate, queue: queue)

        let queryFilter: Document = ["_id": AnyBSON(drinkObjectId) ]
        let documentUpdate: Document = ["$set": ["containsDairy": "true"]]

        collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
            switch result {
            case .failure(let error):
                print("Call to MongoDB failed: \(error.localizedDescription)")
                return
            case .success(let updateResult):
                print("Successfully updated the document")
            }
        }
        changeStream.close()
    }
}
