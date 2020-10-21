let app = App(id: YOUR_REALM_APP_ID)
// Log in...
let user = app.currentUser
let partitionValue = "myPartition"
Realm.asyncOpen(configuration: user!.configuration(partitionValue: partitionValue)) { result in
    switch result {
    case .failure(let error):
        print("Failed to open realm: \(error.localizedDescription)")
        // handle error
    case .success(let realm):
        print("Successfully opened realm: \(realm)")
        // Use realm
    }
}