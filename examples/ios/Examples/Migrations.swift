import XCTest
import RealmSwift

/*
// :code-block-start: model-v1
// Version 1 had separate fields for first name and last name
class MigrationExample_Person: Object {
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""
    @objc dynamic var age = 0
}
// :code-block-end:
*/

// :code-block-start: model-v2
// Version 2 now has one combined field for the name.
class MigrationExample_Person: Object {
    @objc dynamic var fullName = ""
    @objc dynamic var age = 0
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
                if (oldSchemaVersion < 2) {
                    // The enumerateObjects(ofType:_:) method iterates over
                    // every Person object stored in the Realm file
                    migration.enumerateObjects(ofType: MigrationExample_Person.className()) { oldObject, newObject in
                        // combine name fields into a single field
                        let firstName = oldObject!["firstName"] as! String
                        let lastName = oldObject!["lastName"] as! String
                        newObject!["fullName"] = "\(firstName) \(lastName)"
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
}
