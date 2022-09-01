import RealmSwift

// LocalOnlyQsTask is the Task model for this QuickStart
class LocalOnlyQsTask: Object {
    @Persisted var name: String = ""
    @Persisted var owner: String?
    @Persisted var status: String = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

// Entrypoint. Call this to run the example.
func runLocalOnlyExample() {
    // Open the local-only default realm
    let realm = try! Realm()
    // Get all tasks in the realm
    let tasks = realm.objects(LocalOnlyQsTask.self)

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
    let task = LocalOnlyQsTask(name: "Do laundry")
    try! realm.write {
        realm.add(task)
    }
    let anotherTask = LocalOnlyQsTask(name: "App design")
    try! realm.write {
        realm.add(anotherTask)
    }

    // You can also filter a collection
    let tasksThatBeginWithA = tasks.where {
        $0.name.starts(with: "A")
    }
    print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")

    // All modifications to a realm must happen in a write block.
    let taskToUpdate = tasks[0]
    try! realm.write {
        taskToUpdate.status = "InProgress"
    }

    let tasksInProgress = tasks.where {
        $0.status == "InProgress"
    }
    print("A list of all tasks in progress: \(tasksInProgress)")

    // All modifications to a realm must happen in a write block.
    let taskToDelete = tasks[0]
    try! realm.write {
        // Delete the LocalOnlyQsTask.
        realm.delete(taskToDelete)
    }

    print("A list of all tasks after deleting one: \(tasks)")

    // Invalidate notification tokens when done observing
    notificationToken.invalidate()
}
