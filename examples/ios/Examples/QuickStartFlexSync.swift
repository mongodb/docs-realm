// :replace-start: {
//   "terms": {
//     "QuickStartFlexSync_": ""
//   }
// }
// swiftlint:disable identifier_name

 import XCTest
// :snippet-start: import-realm
 import RealmSwift
// :snippet-end:

 let FS_APP_ID = "swift-flexible-vkljj"

// :snippet-start: model
 class QuickStartFlexSync_Todo: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String = ""
    @Persisted var status: String = ""
    @Persisted var ownerId: String

    convenience init(name: String, ownerId: String) {
        self.init()
        self.name = name
        self.ownerId = ownerId
    }
 }
// :snippet-end:

 class QuickStartFlexSync: XCTestCase {
    func testRunExample() async {
        await flexibleSyncQuickStart()
        // Entrypoint. Call this to run the quick start.
        func flexibleSyncQuickStart() async {
            // Instantiate the app
            // :snippet-start: connect-to-backend
            let app = App(id: FS_APP_ID) // Replace FS_APP_ID with your Atlas App ID
            // :snippet-end:
            // :snippet-start: authenticate-user
            do {
                let user = try await app.login(credentials: Credentials.anonymous)
                print("Successfully logged in user: \(user)")
                await openSyncedRealm(user: user)
            } catch {
                print("Error logging in: \(error.localizedDescription)")
            }
            // :snippet-end:
            // :snippet-start: open-synced-realm
            func openSyncedRealm(user: User) async {
                do {
                    var config = user.flexibleSyncConfiguration()
                    // Pass object types to the Flexible Sync configuration
                    // as a temporary workaround for not being able to add a
                    // complete schema for a Flexible Sync app.
                    config.objectTypes = [QuickStartFlexSync_Todo.self]
                    let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
                    // You must add at least one subscription to read and write from a Flexible Sync realm
                    let subscriptions = realm.subscriptions
                    try await subscriptions.update {
                        subscriptions.append(
                            QuerySubscription<QuickStartFlexSync_Todo> {
                                $0.ownerId == user.id
                            })
                    }
                    await useRealm(realm: realm, user: user)
                } catch {
                    print("Error opening realm: \(error.localizedDescription)")
                }
            }
            // :snippet-end:
            // :snippet-start: use-realm
            func useRealm(realm: Realm, user: User) async {
                // :snippet-start: get-all-todos
                // Get all todos in the realm
                let todos = realm.objects(QuickStartFlexSync_Todo.self)
                // :snippet-end:

                // :snippet-start: watch-for-changes
                // Retain notificationToken as long as you want to observe
                let notificationToken = todos.observe { (changes) in
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
                // :snippet-start: create-todo
                let todo = QuickStartFlexSync_Todo(name: "Do laundry", ownerId: user.id)
                try! realm.write {
                    realm.add(todo)
                }
                // :snippet-end:
                let anotherTodo = QuickStartFlexSync_Todo(name: "App design", ownerId: user.id)
                try! realm.write {
                    realm.add(anotherTodo)
                }

                // You can also filter a collection
                let todosThatBeginWithA = todos.where {
                    $0.name.starts(with: "A")
                }
                print("A list of all todos that begin with A: \(todosThatBeginWithA)")

                // :snippet-start: modify-write-block
                // All modifications to a realm must happen in a write block.
                let todoToUpdate = todos[0]
                try! realm.write {
                    todoToUpdate.status = "InProgress"
                }
                // :snippet-end:

                // :snippet-start: filter
                let todosInProgress = todos.where {
                    $0.status == "InProgress"
                }
                print("A list of all todos in progress: \(todosInProgress)")
                // :snippet-end:

                // :snippet-start: delete
                // All modifications to a realm must happen in a write block.
                let todoToDelete = todos[0]
                try! realm.write {
                    // Delete the QuickStartFlexSync_Todo.
                    realm.delete(todoToDelete)
                }
                // :snippet-end:

                print("A list of all todos after deleting one: \(todos)")

                // :snippet-start: logout
                do {
                    try await user.logOut()
                    print("Successfully logged user out")
                } catch {
                    print("Failed to log user out: \(error.localizedDescription)")
                }
                // :snippet-end:

                // :snippet-start: invalidate-notification-token
                // Invalidate notification tokens when done observing
                notificationToken.invalidate()
                // :snippet-end:
            }
            // :snippet-end:
        }
    }
 }
// :replace-end:
