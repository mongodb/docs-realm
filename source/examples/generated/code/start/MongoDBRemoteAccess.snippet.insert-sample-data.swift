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
            }
        }
    }
}
