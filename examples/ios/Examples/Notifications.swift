// :replace-start: {
//   "terms": {
//     "NotificationExample_": ""
//   }
// }
import RealmSwift
import XCTest

// Note: the following is not really tested but it makes for a convenient
// full program example.
// :code-block-start: register-an-object-change-listener
// Define the dog class.
class NotificationExample_Dog: Object {
    @Persisted var name = ""
}

var objectNotificationToken: NotificationToken?

func objectNotificationExample() {
    let dog = NotificationExample_Dog()
    dog.name = "Max"

    // Open the default realm.
    let realm = try! Realm()
    try! realm.write {
        realm.add(dog)
    }
    // Observe object notifications. Keep a strong reference to the notification token
    // or the observation will stop. Invalidate the token when done observing.
    objectNotificationToken = dog.observe { change in
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    }

    // Now update to trigger the notification
    try! realm.write {
        dog.name = "Wolfie"
    }
}
// :code-block-end:

// :code-block-start: register-a-collection-change-listener
class CollectionNotificationExampleViewController: UITableViewController {
    var notificationToken: NotificationToken?

    override func viewDidLoad() {
        super.viewDidLoad()
        let realm = try! Realm()
        let results = realm.objects(NotificationExample_Dog.self)

        // Observe collection notifications. Keep a strong
        // reference to the notification token or the
        // observation will stop.
        notificationToken = results.observe { [weak self] (changes: RealmCollectionChange) in
            guard let tableView = self?.tableView else { return }
            switch changes {
            case .initial:
                // Results are now populated and can be accessed without blocking the UI
                tableView.reloadData()
            case .update(_, let deletions, let insertions, let modifications):
                // Query results have changed, so apply them to the UITableView
                tableView.performBatchUpdates({
                    // Always apply updates in the following order: deletions, insertions, then modifications.
                    // Handling insertions before deletions may result in unexpected behavior.
                    tableView.deleteRows(at: deletions.map({ IndexPath(row: $0, section: 0)}),
                                         with: .automatic)
                    tableView.insertRows(at: insertions.map({ IndexPath(row: $0, section: 0) }),
                                         with: .automatic)
                    tableView.reloadRows(at: modifications.map({ IndexPath(row: $0, section: 0) }),
                                         with: .automatic)
                }, completion: { finished in
                    // ...
                })
            case .error(let error):
                // An error occurred while opening the Realm file on the background worker thread
                fatalError("\(error)")
            }
        }
    }
}
// :code-block-end:

class Notifications: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testSilentWrite() {
        // :code-block-start: silent-write
        let realm = try! Realm()

        // Observe realm notifications
        let token = realm.observe { notification, realm in
            // ... handle update
        }

        // Later, pass the token in an array to the realm.write(withoutNotifying:)
        // method to write without sending a notification to that observer.
        try! realm.write(withoutNotifying: [token]) {
            // ... write to realm
        }

        // Finally
        token.invalidate()
        // :code-block-end:
    }

    func testRealmNotification() {
        class VC {
            func updateUI() {}
        }
        let viewController = VC()
        // :code-block-start: register-a-realm-change-listener
        let realm = try! Realm()

        // Observe realm notifications. Keep a strong reference to the notification token
        // or the observation will stop.
        let token = realm.observe { notification, realm in
            // `notification` is an enum specifying what kind of notification was emitted
            viewController.updateUI()
        }

        // ...

        // Later, explicitly stop observing.
        token.invalidate()
        // :code-block-end:
    }

    func testStopWatching() {
        // :code-block-start: stop-watching
        let realm = try! Realm()

        // Observe and obtain token
        let token = realm.observe { notification, realm in /* ... */ }

        // Stop observing
        token.invalidate()
        // :code-block-end:
    }
}
// :replace-end:
