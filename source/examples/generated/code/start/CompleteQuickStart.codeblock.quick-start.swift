// Now logged in, do something with user
let user = app.currentUser
let partitionValue = "myPartition"

var configuration = user!.configuration(partitionValue: partitionValue)
configuration.objectTypes = [QsTask.self]
Realm.asyncOpen(configuration: user!.configuration(partitionValue: partitionValue)) { (result) in
    switch result {
    case .failure(let error):
        fatalError(error.localizedDescription)
    case .success(let realm):
        // All tasks in the realm
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

        let task = QsTask(partition: partitionValue, name: "Do laundry")
        try! realm.write {
            realm.deleteAll()
            realm.add(task)
        }
        let anotherQsTask = QsTask(partition: partitionValue, name: "App design")
        try! realm.write {
            realm.add(anotherQsTask)
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