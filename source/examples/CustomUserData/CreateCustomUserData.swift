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

    // Insert the custom user data object
    collection.insertOne([
        "userId": AnyBSON(user.identity!),
        "favoriteColor": "pink"
    ]) { (newObjectId, error) in
          guard error == nil else {
              print("Failed to insert document: \(error!.localizedDescription)")
              return
          }
          print("Inserted custom user data document with object ID: \(newObjectId!)")
    }
}
