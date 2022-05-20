// Check to see if you have a logged-in user.
if app.currentUser != nil {
    // If you have logged-in user credentials, open the realm.
    let offlineRealm = try! Realm(configuration: configuration)
    print("Opened realm: \(realm)")
} else {
    // If the user is not logged in, proceed to the login flow.
    print("Current user is not logged in.")
}
