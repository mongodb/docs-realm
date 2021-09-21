func testAsyncAwaitLogin() async {
    let anonCredentials = Credentials.anonymous

    do {
        let user = try await app.login(credentials: anonCredentials)
        print("Successfully logged in as user \(user)")
    } catch {
        print("Login failed: \(error.localizedDescription)")
    }
}
