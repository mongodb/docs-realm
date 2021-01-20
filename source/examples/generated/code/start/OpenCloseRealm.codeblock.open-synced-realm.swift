let app = App(id: YOUR_REALM_APP_ID)
// Log in...
let user = app.currentUser
let partitionValue = "some partition value"

var configuration = user!.configuration(partitionValue: partitionValue)

Realm.asyncOpen(configuration: configuration) { result in
    switch result {
    case .failure(let error):
        print("Failed to open realm: \(error.localizedDescription)")
        // handle error
    case .success(let realm):
        print("Successfully opened realm: \(realm)")
        // Use realm
    }
}