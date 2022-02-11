// :replace-start: {
//   "terms": {
//     "QTask": "Task"
//   }
// }

import XCTest
import RealmSwift
import Foundation

class BundleRealms: XCTestCase {

    func testCopyRealm() async throws {
        // :code-block-start: copy-synced-realm-for-bundling
        let app = App(id: YOUR_REALM_APP_ID)

        // Log in the user whose Realm you want to copy for bundling
        let seedUser = try await app.login(credentials: Credentials.anonymous)

        // Create a configuration to open the seed user's realm
        var config = seedUser.configuration(partitionValue: "Partition You Want to Bundle")
        config.objectTypes = [QsTask.self]

        // Open the Realm with the seed user's config
        let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
        print("Successfully opened realm: \(realm)")

        // :hide-start:
        // Delete all objects to start with a fresh realm
        try! realm.write {
            realm.delete(realm.objects(QsTask.self))
        }
        // :hide-end:

        // Write the seed data you want to bundle with your application to the realm
        let task = QsTask(value: ["name": "Feed the dragons", "owner": "Daenerys", "status": "In Progress"])

        try realm.write {
            realm.add(task)
        }
        print("Successfully added a task to the realm")
        let tasks = realm.objects(QsTask.self)
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
        // :code-block-end:
    }

    func testOpenCopiedRealm() async throws {
        // :code-block-start: open-bundled-synced-realm
        let app = App(id: YOUR_REALM_APP_ID)

        // Log in an app user who will use the bundled realm
        let user = try await app.login(credentials: Credentials.anonymous)

        // Create a configuration for the app user's realm
        // This should use the same partition value as the bundled Realm
        var config = user.configuration(partitionValue: "Partition You Want to Bundle")
        config.objectTypes = [QsTask.self]

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

        // Read and write to the bundled Realm as normal
        let tasks = realm.objects(QsTask.self)

        // There should be one task whose owner is Daenerys because that's
        // what was in the bundled realm.
        var daenerysTasks = tasks.filter("owner == 'Daenerys'")
        XCTAssertEqual(daenerysTasks.count, 1)
        print("The bundled realm has \(daenerysTasks.count) tasks whose owner is Daenerys")

        // Write as usual to the realm, and see the object count increment
        let task = QsTask(value: ["name": "Banish Ser Jorah", "owner": "Daenerys", "status": "In Progress"])
        try realm.write {
            realm.add(task)
        }
        print("Successfully added a task to the realm")

        daenerysTasks = tasks.filter("owner == 'Daenerys'")
        XCTAssertEqual(daenerysTasks.count, 2)
        // :code-block-end:
    }
}
// :replace-end:
