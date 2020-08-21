let appId = "<YourAppId>" // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous()) { (user, error) in
    guard error == nil else {
        print("Failed to log in: \(error!.localizedDescription)")
        return
    }
    guard let user = user else {
        fatalError("User is nil without error")
    }
    let client = user.mongoClient("mongodb-atlas")
    let database = client.database(named: "my_database")
    let collection = database.collection(withName: "users")
    collection.updateOneDocument(
        filter: ["userId": AnyBSON(user.identity!)],
        update: ["favoriteColor": "cerulean"]
    ) { (updateResult, error) in
          guard error == nil else {
              print("Failed to update: \(error!.localizedDescription)")
              return
          }
          print("Matched: \(updateResult!.matchedCount), updated: \(updateResult!.modifiedCount)")
    }
}