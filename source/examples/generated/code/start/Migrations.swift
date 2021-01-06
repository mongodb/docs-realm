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