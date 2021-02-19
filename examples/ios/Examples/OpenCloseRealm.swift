import XCTest
import RealmSwift

class OpenCloseRealm: XCTestCase {
    func testOpenLocalRealm() {
        // :code-block-start: open-local-realm
        // Open the default realm
        let defaultRealm = try! Realm()

        // Open the realm with a specific file URL, for example a username
        let username = "GordonCole"
        var config = Realm.Configuration.defaultConfiguration
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent(username)
        config.fileURL!.appendPathExtension("realm")
        let realm = try! Realm(configuration: config)
        // :code-block-end:
    }

    func testOpenInMemoryRealm() {
        // :code-block-start: open-in-memory-realm
        // Open the realm with a specific in-memory identifier.
        let identifier = "MyRealm"
        let config = Realm.Configuration(
            inMemoryIdentifier: identifier)
        // Open the realm
        let realm = try! Realm(configuration: config)
        // :code-block-end:
    }

    func testConfigureObjectTypes() {
        // :code-block-start: configure-object-types
        var config = Realm.Configuration.defaultConfiguration
        // :remove-start:
        config.inMemoryIdentifier = "test"
        // :remove-end:

        // Given: `class Task: Object`
        // Limit the realm to only the Task object. All other
        // Object- and EmbeddedObject-derived classes are not added.
        config.objectTypes = [Task.self]

        let realm = try! Realm(configuration: config)
        // :code-block-end:
    }
}
