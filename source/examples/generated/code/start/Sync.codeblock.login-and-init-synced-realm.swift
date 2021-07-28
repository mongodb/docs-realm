// Instantiate the app using your Realm app ID
let app = App(id: YOUR_REALM_APP_ID)
// Authenticate with the instance of the app that points
// to your backend. Here, we're using anonymous login.
app.login(credentials: Credentials.anonymous) { (result) in
    switch result {
    case .failure(let error):
        fatalError("Login failed: \(error.localizedDescription)")
    case .success:
        // Continue
        print("Successfully logged in to app")
    }
}
// Assign user to the entity currently authenticated with
// this instance of your app.
let user = app.currentUser
// Specify which data this authenticated user should
// be able to access.
let partitionValue = "some partition value"
// Store a configuration that consists of the current user,
// authenticated to this instance of your app, who should be
// able to access this data (partition).
var configuration = user!.configuration(partitionValue: partitionValue)
// Initialize a synced realm on device with this configuration.
// Changes will attempt to sync in the background, but will
// not block opening the realm.
let realm = try! Realm(configuration: configuration)
print("Opened realm: \(realm)")
