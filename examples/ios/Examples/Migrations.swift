// :replace-start: {
//   "terms": {
//     "MigrationExampleV0_": "",
//     "MigrationExampleV1_": "",
//     "MigrationExampleV2_": ""
//   }
// }
import XCTest
import RealmSwift

class MigrationExampleV0_Person: Object {
    @Persisted var yearsSinceBirth = 0
}

// :code-block-start: model-v1
// In the first version of the app, the Person model
// has separate fields for first and last names.
class MigrationExampleV1_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var age = 0
}
// :code-block-end:

// :code-block-start: model-v2
// In the second version, the Person model has one
// combined field for the name. A migration will be required
// to convert from version 1 to version 2.
class MigrationExampleV2_Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = 0
}
// :code-block-end:

class Migrations: XCTestCase {
    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testLocalMigration() {
        // :code-block-start: local-migration
        // In application(_:didFinishLaunchingWithOptions:)
        let config = Realm.Configuration(
            // :hide-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "LocalMigrationExample",
            // :hide-end:
            schemaVersion: 2, // Set the new schema version.
            migrationBlock: { migration, oldSchemaVersion in
                if oldSchemaVersion < 2 {
                    // The enumerateObjects(ofType:_:) method iterates over
                    // every Person object stored in the Realm file
                    migration.enumerateObjects(ofType: MigrationExampleV2_Person.className()) { oldObject, newObject in
                        // combine name fields into a single field
                        let firstName = oldObject!["firstName"] as? String
                        let lastName = oldObject!["lastName"] as? String
                        newObject!["fullName"] = "\(firstName!) \(lastName!)"
                    }
                }
            }
        )

        // Tell Realm to use this new configuration object for the default Realm
        Realm.Configuration.defaultConfiguration = config

        // Now that we've told Realm how to handle the schema change, opening the file
        // will automatically perform the migration
        let realm = try! Realm()
        // :code-block-end:
        // Quash unused variable warning
        XCTAssert(realm.isEmpty)
    }

    func testRenameProperty() {
        // :code-block-start: rename-property
        let config = Realm.Configuration(
            // :hide-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "LocalMigrationExample",
            // :hide-end:
            schemaVersion: 1,
            migrationBlock: { migration, oldSchemaVersion in
                // We haven’t migrated anything yet, so oldSchemaVersion == 0
                if oldSchemaVersion < 1 {
                    // The renaming operation should be done outside of calls to `enumerateObjects(ofType: _:)`.
                    migration.renameProperty(onType: MigrationExampleV0_Person.className(), from: "yearsSinceBirth", to: "age")
                }
            })
        // :code-block-end: rename-property
        print(config)
    }

}
// :replace-end:
