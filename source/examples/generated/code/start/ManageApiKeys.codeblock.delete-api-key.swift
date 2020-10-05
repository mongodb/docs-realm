let app = App(id: YOUR_REALM_APP_ID)

// ... log in ...

let user = app.currentUser!
let client = user.apiKeysAuth

let apiKey: UserAPIKey?

// ... Obtain a user API key ...

client.deleteAPIKey(apiKey!.objectId) { (error) in
    guard error == nil else {
        print("Failed to delete key: \(error!)")
        return
    }
    // Key deleted
}