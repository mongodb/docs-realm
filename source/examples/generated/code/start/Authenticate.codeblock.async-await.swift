func login() async throws -> User {
    // Instantiate the app using your Realm app ID
    let app = App(id: YOUR_REALM_APP_ID)
    // Authenticate with the instance of the app that points
    // to your backend. Here, we're using anonymous login.
    let loggedInUser = try await app.login(credentials: Credentials.anonymous)
    return loggedInUser
}

do {
    let user = try await login()
    // Do something with user
    print("Successfully logged in user: \(user)")
} catch {
    print("Failed to log in user: \(error.localizedDescription)")
}
