@MainActor
func mainThreadFunction() async throws {
    let username = "GordonCole"
    
    // Customize the default realm config
    var config = Realm.Configuration.defaultConfiguration
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent(username)
    config.fileURL!.appendPathExtension("realm")
    
    // Open an actor-confined realm with a specific configuration
    let realm = try await Realm(configuration: config, actor: MainActor.shared)
    
    try await useTheRealm(realm: realm)
}
