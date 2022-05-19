import XCTest

private var gExpectation: XCTestExpectation?

import UIKit

// :snippet-start: complete-quick-start
// :snippet-start: import-realm
import RealmSwift
// :snippet-end:

// :snippet-start: model
// QsTask is the Task model for this QuickStart
class QsTask: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String = ""
    @Persisted var owner: String?
    @Persisted var status: String = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}
// :snippet-end:

// Entrypoint. Call this to run the example.
func runExample() {
    // Instantiate the app
    // :snippet-start: initialize-app
    let app = App(id: YOUR_REALM_APP_ID) // Replace YOUR_REALM_APP_ID with your Realm app ID
    // :snippet-end:
    // :snippet-start: authenticate-user
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
    // :snippet-end:
}

func onLogin() {
    // Now logged in, do something with user
    // :snippet-start: open-realm
    let user = app.currentUser!

    // The partition determines which subset of data to access.
    let partitionValue = "some partition value"

    // Get a sync configuration from the user object.
    var configuration = user.configuration(partitionValue: partitionValue)
    // :hide-start:
    configuration.objectTypes = [QsTask.self]
    // :hide-end:
    // Open the realm asynchronously to ensure backend data is downloaded first.
    Realm.asyncOpen(configuration: configuration) { (result) in
        switch result {
        case .failure(let error):
            print("Failed to open realm: \(error.localizedDescription)")
            // Handle error...
        case .success(let realm):
            // Realm opened
            onRealmOpened(realm)
        }
    }
    // :snippet-end:
}

func onRealmOpened(_ realm: Realm) {
    // :snippet-start: get-all-tasks
    // Get all tasks in the realm
    let tasks = realm.objects(QsTask.self)
    // :snippet-end:

    // :snippet-start: watch-for-changes
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
    // :snippet-end:

    // Delete all from the realm
    try! realm.write {
        realm.deleteAll()
    }

    // Add some tasks
    // :snippet-start: create-task
    let task = QsTask(name: "Do laundry")
    try! realm.write {
        realm.add(task)
    }
    // :snippet-end:
    let anotherTask = QsTask(name: "App design")
    try! realm.write {
        realm.add(anotherTask)
    }

    // You can also filter a collection
    let tasksThatBeginWithA = tasks.where {
        $0.name.starts(with: "A")
    }
    print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")

    // :snippet-start: modify-write-block
    // All modifications to a realm must happen in a write block.
    let taskToUpdate = tasks[0]
    try! realm.write {
        taskToUpdate.status = "InProgress"
    }
    // :snippet-end:

    // :snippet-start: filter
    let tasksInProgress = tasks.where {
        $0.status == "InProgress"
    }
    print("A list of all tasks in progress: \(tasksInProgress)")
    // :snippet-end:

    // :snippet-start: delete
    // All modifications to a realm must happen in a write block.
    let taskToDelete = tasks[0]
    try! realm.write {
        // Delete the QsTask.
        realm.delete(taskToDelete)
    }
    // :snippet-end:

    print("A list of all tasks after deleting one: \(tasks)")

    // :snippet-start: logout
    app.currentUser?.logOut { (error) in
        // Logged out or error occurred
        // :hide-start:
        gExpectation!.fulfill()
        // :hide-end:
    }
    // :snippet-end:

    // :snippet-start: invalidate-notification-token
    // Invalidate notification tokens when done observing
    notificationToken.invalidate()
    // :snippet-end:
}
// :snippet-end:

class QuickStartTest: XCTestCase {
    func testRunExample() {
        gExpectation = XCTestExpectation(description: "Run complete quick start")
        runExample()
        wait(for: [gExpectation!], timeout: 20.0)
    }
}
