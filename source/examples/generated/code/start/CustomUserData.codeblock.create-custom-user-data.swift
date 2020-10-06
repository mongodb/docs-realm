let appId = YOUR_REALM_APP_ID // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous) { (user, error) in
    guard error == nil else {
        print("Failed to log in: \(error!.localizedDescription)")
        return
    }
    let client = user!.mongoClient("mongodb-atlas")
    let database = client.database(named: "my_database")
    let collection = database.collection(withName: "users")

    // Insert the custom user data object
    collection.insertOne([
        "userId": AnyBSON(user!.id),
        "favoriteColor": "pink"
    ]) { (newObjectId, error) in
          guard error == nil else {
              print("Failed to insert document: \(error!.localizedDescription)")
              return
          }
          print("Inserted custom user data document with object ID: \(newObjectId!)")
    }
}