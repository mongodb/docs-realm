let app = App(id: YOUR_REALM_APP_ID)
let client = app.emailPasswordAuth
let email = "skroob@example.com"
// If Realm is set to run a custom confirmation function,
// we can trigger that function to run again here.
client.retryCustomConfirmation(email) { (error) in
    guard error == nil else {
        print("Failed to retry custom confirmation: \(error!.localizedDescription)")
        return
    }
    // The custom confirmation function has been
    // triggered to run again for the user.
    print("Custom confirmation retriggered")
}
