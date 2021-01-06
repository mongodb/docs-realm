import XCTest
import RealmSwift

/*
// Version 1 had separate fields for first name and l
class MigrationExample_Person: Object {
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""
    @objc dynamic var age = 0
}
*/

// Version 2 now has one combined field for the name.
class MigrationExample_Person: Object {
    @objc dynamic var fullName = ""
    @objc dynamic var age = 0
}

class Migrations: XCTestCase {
    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testLocalMigration() {
        // In application(_:didFinishLaunchingWithOptions:)
        let config = Realm.Configuration(
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
        // Quash unused variable warning
        XCTAssert(realm.isEmpty)
    }
}
