func testAsyncAwaitOpenRealm() async throws {
    let app = App(id: YOUR_REALM_APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    let partitionValue = "some partition value"
    var configuration = user.configuration(partitionValue: partitionValue)
    let realm = try await Realm(configuration: configuration)
    print("Successfully opened realm: \(realm)")
}
