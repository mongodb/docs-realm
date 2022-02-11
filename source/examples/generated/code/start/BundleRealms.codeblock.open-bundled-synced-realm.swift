let app = App(id: YOUR_REALM_APP_ID)

// Log in an app user who will use the bundled realm
let user = try await app.login(credentials: Credentials.anonymous)

// Create a configuration for the app user's realm
// This should use the same partition value as the bundled realm
var config = user.configuration(partitionValue: "Partition You Want to Bundle")
config.objectTypes = [Task.self]

// Specify the path for the app user's realm
// We're using FileManager here for tested code examples,
// but you'll use NSBundle.main.path(forResource: ofType)
// if you bundle the realm with your app via Xcode.
guard let seedFileDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }
let completeSeedPath = seedFileDir.appendingPathComponent("seed.realm")

// Set the path as a seed file for the app user's realm
config.seedFilePath = completeSeedPath

// Open the synced realm, downloading any changes before opening it
let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
print("Successfully opened the bundled realm")

// Read and write to the bundled realm as normal
let tasks = realm.objects(Task.self)

// There should be one task whose owner is Daenerys because that's
// what was in the bundled realm.
var daenerysTasks = tasks.filter("owner == 'Daenerys'")
XCTAssertEqual(daenerysTasks.count, 1)
print("The bundled realm has \(daenerysTasks.count) tasks whose owner is Daenerys")

// Write as usual to the realm, and see the object count increment
let task = Task(value: ["name": "Banish Ser Jorah", "owner": "Daenerys", "status": "In Progress"])
try realm.write {
    realm.add(task)
}
print("Successfully added a task to the realm")

daenerysTasks = tasks.filter("owner == 'Daenerys'")
XCTAssertEqual(daenerysTasks.count, 2)
