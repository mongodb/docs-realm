let app = App(id: YOUR_REALM_APP_ID)

// Log in the user whose Realm you want to copy for bundling
let seedUser = try await app.login(credentials: Credentials.anonymous)

// Create a configuration to open the seed user's realm
var config = seedUser.configuration(partitionValue: "Partition You Want to Bundle")
config.objectTypes = [Task.self]

// Open the Realm with the seed user's config
let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
print("Successfully opened realm: \(realm)")

// Write the seed data you want to bundle with your application to the realm
let task = Task(value: ["name": "Feed the dragons", "owner": "Daenerys", "status": "In Progress"])

try realm.write {
    realm.add(task)
}
print("Successfully added a task to the realm")
let tasks = realm.objects(Task.self)
let daenerysTasks = tasks.filter("owner == 'Daenerys'")
XCTAssertEqual(daenerysTasks.count, 1)

// Specify an output directory for the bundled realm
// We're using FileManager here for tested code examples,
// but this could be a static directory on your computer.
guard let outputDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }

// Append a file name to complete the path
let bundleRealmFilePath = outputDir.appendingPathComponent("seed.realm")

// Update the config file path to the path where you want to save the bundled realm
config.fileURL = bundleRealmFilePath

// Check to see if there is already a realm at the bundled realm file path. If there
// is already a realm there, delete it.
if Realm.fileExists(for: config) {
    try Realm.deleteFiles(for: config)
    print("Successfully deleted existing realm at path: \(bundleRealmFilePath)")
} else {
    print("No file currently exists at path")
}

// Write a copy of the realm you want to bundle at the path you specified
try realm.writeCopy(toFile: bundleRealmFilePath)
print("Successfully made a copy of the realm at path: \(bundleRealmFilePath)")
