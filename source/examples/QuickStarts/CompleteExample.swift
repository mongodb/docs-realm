import UIKit
import RealmSwift

let app = App(id: "<your-app-id>") // replace this with your App ID

class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    // When configuring Sync, we selected `_partition` as the partition key.
    // A partition key is only required if you are using Sync.
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String? = nil
    @objc dynamic var status: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }

    convenience init(partition: String, name: String) {
        self.init()
        self._partition = partition;
        self.name = name;
    }
}

class ExampleViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad();
        logInAndRunExample()
    }

    func logInAndRunExample() {
        print("Attempting to log in")
        app.login(credentials: Credentials.anonymous()) { [weak self](user, error) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.sync {
                guard error == nil else {
                    print("Login failed: \(error!)")
                    return
                }

                print("Login succeeded!");

                self!.runExample()
            }
        }
    }

    func runExample() {
        // Now logged in, do something with user
        let user = app.currentUser()
        let partitionValue = "myPartition"

        var configuration = user!.configuration(partitionValue: partitionValue)
        configuration.objectTypes = [Task.self]
        let realm = try! Realm(configuration: configuration)

        // All dogs in the realm
        let tasks = realm.objects(Task.self)

        // Retain notificationToken as long as you want to observe
        let notificationToken = tasks.observe { (changes) in
            switch changes {
            case .initial: break
                // Results are now populated and can be accessed without blocking the UI
            case .update(_, let deletions, let insertions, let modifications):
                // Query results have changed.
                print("Deleted indices: ", deletions)
                print("Inserted indices: ", insertions)
                print("Modified modifications: ", modifications)
            case .error(let error):
                // An error occurred while opening the Realm file on the background worker thread
                fatalError("\(error)")
            }
        }

        let task = Task(partition: partitionValue, name: "Do laundry")
        try! realm.write {
            realm.deleteAll()
            realm.add(task)
        }
        let anotherTask = Task(partition: partitionValue, name: "App design")
        try! realm.write {
            realm.add(anotherTask)
        }

        // You can also filter a collection
        let tasksThatBeginWithA = tasks.filter("name beginsWith 'A'")
        print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")

        let taskToUpdate = tasks[0]

        // All modifications to a realm must happen in a write block.
        try! realm.write {
            taskToUpdate.status = "InProgress"
        }

        let tasksInProgress = tasks.filter("status = %@", "InProgress")
        print("A list of all tasks in progress: \(tasksInProgress)")

        let taskToDelete = tasks[0]
        // All modifications to a realm must happen in a write block.
        try! realm.write {
            // Delete the Task.
            realm.delete(taskToDelete)
        }

        print("A list of all tasks after deleting one: \(tasks)")

        app.currentUser()?.logOut() { (error) in
            // Logged out or error occurred
        }

        // Invalidate notification tokens when done observing
        notificationToken.invalidate()
    }
}

