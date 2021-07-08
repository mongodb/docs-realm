import XCTest

import UIKit

// :code-block-start: complete-quick-start-local
// :code-block-start: import-realmswift
import RealmSwift
// :code-block-end:

// :code-block-start: quick-start-local-define-object-model
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
// :code-block-end:

// Entrypoint. Call this to run the example.
func runLocalOnlyExample() {
    // :code-block-start: quick-start-local-open-realm-without-config-param
    // Open the local-only default realm
    let localRealm = try! Realm()
    // :code-block-end:
    // :code-block-start: quick-start-local-live-collection-of-all-tasks
    // Get all tasks in the realm
    let tasks = localRealm.objects(LocalOnlyQsTask.self)
    // :code-block-end:

    // :code-block-start: quick-start-local-set-notification-token
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
    // :code-block-end:

    // Delete all from the realm
    try! localRealm.write {
        localRealm.deleteAll()
    }

    // :code-block-start: quick-start-local-write-transaction
    // Add some tasks
    let task = LocalOnlyQsTask(name: "Do laundry")
    try! localRealm.write {
        localRealm.add(task)
    }
    // :code-block-end:
    let anotherTask = LocalOnlyQsTask(name: "App design")
    try! localRealm.write {
        localRealm.add(anotherTask)
    }

    // :code-block-start: quick-start-local-filter-collection
    // You can also filter a collection
    let tasksThatBeginWithA = tasks.filter("name beginsWith 'A'")
    print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")
    // :code-block-end:

    // :code-block-start: quick-start-local-modify-task
    // All modifications to a realm must happen in a write block.
    let taskToUpdate = tasks[0]
    try! localRealm.write {
        taskToUpdate.status = "InProgress"
    }
    // :code-block-end:

    let tasksInProgress = tasks.filter("status = %@", "InProgress")
    print("A list of all tasks in progress: \(tasksInProgress)")

    // :code-block-start: quick-start-local-delete-task
    // All modifications to a realm must happen in a write block.
    let taskToDelete = tasks[0]
    try! localRealm.write {
        // Delete the LocalOnlyQsTask.
        localRealm.delete(taskToDelete)
    }
    // :code-block-end:

    print("A list of all tasks after deleting one: \(tasks)")

    // :code-block-start: quick-start-local-invalidate-notification-token
    // Invalidate notification tokens when done observing
    notificationToken.invalidate()
    // :code-block-end:
}
// :code-block-end:

class LocalOnlyQuickStartTest: XCTestCase {
    func testRunLocalOnlyExample() {
        runLocalOnlyExample()
    }
}
