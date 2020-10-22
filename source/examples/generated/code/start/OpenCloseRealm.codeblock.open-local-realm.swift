let config = Realm.Configuration(
    fileURL: Bundle.main.url(forResource: "myBundledData", withExtension: "realm"),
    inMemoryIdentifier: "myRealm")

// Open the Realm with the configuration
let realm = try! Realm(configuration: config)
print("Opened realm: \(realm)")