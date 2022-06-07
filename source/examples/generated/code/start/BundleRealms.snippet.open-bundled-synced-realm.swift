let app = App(id: YOUR_APP_SERVICES_APP_ID)

// Log in an app user who will use the bundled realm
let user = try await app.login(credentials: Credentials.anonymous)

// Create a configuration for the app user's realm
// This should use the same partition value as the bundled realm
var newUserConfig = user.configuration(partitionValue: "Partition You Want to Bundle")
newUserConfig.objectTypes = [Task.self]

// Find the path of the seed.realm file in your project
let realmURL = Bundle.main.url(forResource: "seed", withExtension: ".realm")
print("The bundled realm URL is: \(realmURL)")

// When you use the `seedFilePath` parameter, this copies the
// realm at the specified path for use with the user's config
newUserConfig.seedFilePath = realmURL

// Open the synced realm, downloading any changes before opening it.
// This starts with the existing data in the bundled realm, but checks
// for any updates to the data before opening it in your application.
let realm = try await Realm(configuration: newUserConfig, downloadBeforeOpen: .always)
print("Successfully opened the bundled realm")

// Read and write to the bundled realm as normal
let tasks = realm.objects(Task.self)

// There should be one task whose owner is Daenerys because that's
// what was in the bundled realm.
var daenerysTasks = tasks.where { $0.owner == "Daenerys" }
XCTAssertEqual(daenerysTasks.count, 1)
print("The bundled realm has \(daenerysTasks.count) tasks whose owner is Daenerys")

// Write as usual to the realm, and see the object count increment
let task = Task(value: ["name": "Banish Ser Jorah", "owner": "Daenerys", "status": "In Progress"])
try realm.write {
    realm.add(task)
}
print("Successfully added a task to the realm")

daenerysTasks = tasks.where { $0.owner == "Daenerys" }
XCTAssertEqual(daenerysTasks.count, 2)
