import RealmSwift

// QsTask is the Task model for this QuickStart
class QsTask: Object {
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

// Entrypoint. Call this to run the example.
func runExample() {
    // Instantiate the app
    let app = App(id: YOUR_REALM_APP_ID) // Replace YOUR_REALM_APP_ID with your Realm app ID 
    // Log in anonymously.
    app.login(credentials: Credentials.anonymous) { (result) in
        // Remember to dispatch back to the main thread in completion handlers
        // if you want to do anything on the UI.
        DispatchQueue.main.async {
            switch result {
            case .failure(let error):
                print("Login failed: \(error)")
            case .success(let user):
                print("Login as \(user) succeeded!")
                // Continue below
                onLogin()
            }
        }
    }
}

func onLogin() {
    // Now logged in, do something with user
    let user = app.currentUser!
    
    // The partition determines which subset of data to access.
    let partitionValue = "some partition value"

    // Get a sync configuration from the user object.
    var configuration = user.configuration(partitionValue: partitionValue)
    configuration.objectTypes = [QsTask.self]
    // Open the realm asynchronously to ensure backend data is downloaded first.
    Realm.asyncOpen(configuration: configuration) { (result) in
        switch result {
        case .failure(let error):
            print("Failed to open realm: \(error.localizedDescription)")
            // Handle error...
        case .success(let realm):
            // Get all tasks in the realm
            let tasks = realm.objects(QsTask.self)

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
            
            // Delete all from the realm
            try! realm.write {
                realm.deleteAll()
            }
            
            // Add some tasks
            let task = QsTask(partition: partitionValue, name: "Do laundry")
            try! realm.write {
                realm.add(task)
            }
            let anotherTask = QsTask(partition: partitionValue, name: "App design")
            try! realm.write {
                realm.add(anotherTask)
            }

            // You can also filter a collection
            let tasksThatBeginWithA = tasks.filter("name beginsWith 'A'")
            print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")

            // All modifications to a realm must happen in a write block.
            let taskToUpdate = tasks[0]
            try! realm.write {
                taskToUpdate.status = "InProgress"
            }

            let tasksInProgress = tasks.filter("status = %@", "InProgress")
            print("A list of all tasks in progress: \(tasksInProgress)")

            // All modifications to a realm must happen in a write block.
            let taskToDelete = tasks[0]
            try! realm.write {
                // Delete the QsTask.
                realm.delete(taskToDelete)
            }

            print("A list of all tasks after deleting one: \(tasks)")

            app.currentUser?.logOut() { (error) in
                // Logged out or error occurred
            }

            // Invalidate notification tokens when done observing
            notificationToken.invalidate()
        }
    }
}