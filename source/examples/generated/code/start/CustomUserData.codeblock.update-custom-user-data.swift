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
              return
          }
          
          // User document updated. 
          print("Matched: \(updateResult!.matchedCount), updated: \(updateResult!.modifiedCount)")
    }
}