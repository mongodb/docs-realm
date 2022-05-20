func testSpecifyDownloadBehavior() async throws {
    let app = App(id: YOUR_REALM_APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    let partitionValue = "some partition value"
    var configuration = user.configuration(partitionValue: partitionValue)
    let realm = try await Realm(configuration: configuration, downloadBeforeOpen: .always) 
    print("Successfully opened realm after downloading: \(realm)")
}
