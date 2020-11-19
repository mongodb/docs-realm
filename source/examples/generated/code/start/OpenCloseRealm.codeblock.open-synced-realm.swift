let app = App(id: YOUR_REALM_APP_ID)
// Log in...
let user = app.currentUser
let partitionValue = "some partition value"

var configuration = user!.configuration(partitionValue: partitionValue)

// The following is only required if you want to specify exactly which
// types to include in the realm. By default, Realm automatically finds
// all subclasses of Object and EmbeddedObject to add to the realm.
configuration.objectTypes = [Task.self]

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