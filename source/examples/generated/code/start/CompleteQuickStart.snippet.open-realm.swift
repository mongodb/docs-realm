let user = app.currentUser!

// The partition determines which subset of data to access.
let partitionValue = "some partition value"

// Get a sync configuration from the user object.
var configuration = user.configuration(partitionValue: partitionValue)
// Open the realm asynchronously to ensure backend data is downloaded first.
Realm.asyncOpen(configuration: configuration) { (result) in
    switch result {
    case .failure(let error):
        print("Failed to open realm: \(error.localizedDescription)")
        // Handle error...
    case .success(let realm):
        // Realm opened
        onRealmOpened(realm)
    }
}
