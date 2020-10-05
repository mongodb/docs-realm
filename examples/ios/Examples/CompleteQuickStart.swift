import XCTest
import RealmSwift

private var g_expectation: XCTestExpectation?

import UIKit
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


class CompleteQuickStartTest: XCTestCase {

    override func setUp() {
        let expectation = XCTestExpectation(description: "Log in successfully")
        app.login(credentials: Credentials.anonymous) { (user, error) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                guard error == nil else {
                    print("Login failed: \(error!)")
                    return
                }

                print("Login succeeded!");

                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 25.0)
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testCompleteQuickStart() {
        
    }
    
    func testRunExample() {
        let expectation = XCTestExpectation(description: "Run complete quick start")
        // :code-block-start: quick-start
        // Now logged in, do something with user
        let user = app.currentUser
        let partitionValue = "myPartition"

        var configuration = user!.configuration(partitionValue: partitionValue)
        configuration.objectTypes = [QsTask.self]
        Realm.asyncOpen(configuration: user!.configuration(partitionValue: partitionValue)) { (realm, error) in
            guard let realm = realm else {
                fatalError(error!.localizedDescription)
            }
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
            // :hide-start:
            expectation.fulfill()
            // :hide-end:
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10.0)
    }
}
