// If you want to always download changes from the
// server before opening a realm, you can use asyncOpen
// exclusively; not just the first time you open a synced
// Realm. This only works when the user is online.
Realm.asyncOpen(configuration: configuration) { result in
    switch result {
    case .failure(let error):
        print("Failed to open realm: \(error.localizedDescription)")
        // Handle error
    case .success(let realm):
        print("Successfully opened realm: \(realm)")
        // Use realm
    }
}
