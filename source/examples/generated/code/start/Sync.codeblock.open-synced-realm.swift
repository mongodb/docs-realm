// Get a user. If there is already a logged in user,
// return that user. If not, log in.
func getUser() async throws -> User {
    // Check for a logged-in user
    if app.currentUser != nil {
        return app.currentUser!
    } else {
        // Instantiate the app using your Realm app ID
        let app = App(id: YOUR_REALM_APP_ID)
        // Authenticate with the instance of the app that points
        // to your backend. Here, we're using anonymous login.
        let loggedInUser = try await app.login(credentials: Credentials.anonymous)
        return loggedInUser
    }
}

// Establish the user, define the config, and
// return a realm for that user
func getRealm() async throws -> Realm {
    // Get a logged-in app user
    let user = try await getUser()
    // Specify which data this authenticated user should
    // be able to access.
    let partitionValue = "some partition value"
    // Store a configuration that consists of the current user,
    // authenticated to this instance of your app, who should be
    // able to access this data (partition).
    var configuration = user.configuration(partitionValue: partitionValue)
    // Open a Realm with this configuration.
    let realm = try await Realm(configuration: configuration)
    print("Successfully opened realm: \(realm)")
    return realm
}

// Get a realm
let realm = try await getRealm()
// Do something with the realm
print("The open realm is: \(realm)")
