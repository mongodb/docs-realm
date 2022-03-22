// :replace-start: {
//   "terms": {
//     "FlexibleSync_": ""
//   }
// }

let APPID = "swift-flexible-vkljj"

import XCTest
import RealmSwift

// :code-block-start: flexible-sync-models
class FlexibleSync_Task: Object {
   @Persisted(primaryKey: true) var _id: ObjectId
   @Persisted var taskName: String
   @Persisted var assignee: String?
   @Persisted var completed: Bool
   @Persisted var progressMinutes: Int
}

class FlexibleSync_Team: Object {
   @Persisted(primaryKey: true) var _id: ObjectId
   @Persisted var teamName: String
   @Persisted var tasks: List<FlexibleSync_Task>
   @Persisted var members: List<String>
}
// :code-block-end:

class FlexibleSync: XCTestCase {
    func testAddSingleSubscription() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: add-single-subscription
                        let subscriptions = realm.subscriptions
                        subscriptions.write({
                           subscriptions.append(
                              QuerySubscription<FlexibleSync_Team> {
                                 $0.teamName == "Developer Education"
                              })
                        }, onComplete: { error in // error is optional
                           if error == nil {
                              // Flexible Sync has updated data to match the subscription
                           } else {
                              // Handle the error
                           }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testAddMultipleSubscriptions() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: add-multiple-subscriptions
                        let subscriptions = realm.subscriptions
                        subscriptions.write({
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Task>(name: "completed-tasks") {
                                     $0.completed == true
                            })
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team> {
                                  $0.teamName == "Developer Education"
                            })
                        }, onComplete: { error in // error is optional
                           if error == nil {
                              // Flexible Sync has updated data to match the subscription
                           } else {
                              // Handle the error
                           }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 20)
    }

    func testAddSubscriptionWithOnComplete() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: add-subscription-with-oncomplete
                        let subscriptions = realm.subscriptions
                        subscriptions.write({
                           subscriptions.append(
                              QuerySubscription<FlexibleSync_Task> {
                                 $0.assignee == "John Doe"
                              })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                               // Flexible Sync has updated data to match the subscription
                            } else {
                               // Handle the error
                            }
                         })
                         // :code-block-end:
                        subscriptions.write({
                            subscriptions.append(
                                // :code-block-start: query-subscription-by-name
                                QuerySubscription<FlexibleSync_Task>(name: "long-running-completed") {
                                    $0.completed == true && $0.progressMinutes > 120
                                }
                                // :code-block-end:
                            )
                            subscriptions.append(
                                // :code-block-start: query-subscription-without-name
                                QuerySubscription<FlexibleSync_Team> {
                                   $0.teamName == "Developer Education"
                                }
                                // :code-block-end:
                            )
                        }, onComplete: { error in // error is optional
                            if error == nil {
                               // Flexible Sync has updated data to match the subscription
                            } else {
                               // Handle the error
                            }
                         })
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testUpdateSubscription() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: update-subscription
                        let subscriptions = realm.subscriptions
                        // :hide-start:
                        // Add subscription to update
                        subscriptions.write({
                            subscriptions.append(QuerySubscription<FlexibleSync_Team> {
                                $0.teamName == "Developer Education"
                             })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :hide-end:
                        let foundSubscription = subscriptions.first(ofType: FlexibleSync_Team.self, where: {
                              $0.teamName == "Developer Education"
                        })
                        subscriptions.write({
                            foundSubscription?.update(toType: FlexibleSync_Team.self, where: {
                                 $0.teamName == "Documentation"
                            })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 20)
    }

    func testUpdateSubscriptionByName() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: update-subscription-by-name
                        let subscriptions = realm.subscriptions
                        // :hide-start:
                        // Add subscription to update
                        subscriptions.write({
                            subscriptions.append(QuerySubscription<FlexibleSync_Team>(name: "user-team") {
                                $0.teamName == "Docs"
                             })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :hide-end:
                        let foundSubscription = subscriptions.first(named: "user-team")
                        subscriptions.write({
                            foundSubscription?.update(toType: FlexibleSync_Team.self, where: {
                                 $0.teamName == "Documentation"
                            })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 30)
    }

    func testRemoveSingleSubscription() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: remove-single-subscription
                        let subscriptions = realm.subscriptions
                        // :hide-start:
                        // Add subscriptions to remove
                        subscriptions.write {
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "docs-team") {
                                    $0.teamName == "Documentation"
                                })
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "existing-subscription") {
                                    $0.teamName == "Engineering"
                                })
                        }
                        // :hide-end:
                        // Look for a specific subscription, and then remove it
                        let foundSubscription = subscriptions.first(named: "docs-team")
                        subscriptions.write({
                            subscriptions.remove(foundSubscription!)
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })

                        // Or remove a subscription that you know exists without querying for it
                        subscriptions.write {
                            subscriptions.remove(named: "existing-subscription")
                        }
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 30)
    }

    func testRemoveAllSubscriptionsObjectType() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: remove-subscriptions-to-object-type
                        let subscriptions = realm.subscriptions
                        // :hide-start:
                        // Add subscriptions to remove
                        subscriptions.write {
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "documentation-team") {
                                    $0.teamName == "Documentation"
                                })
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "another-subscription") {
                                    $0.teamName == "Engineering"
                                })
                        }
                        // :hide-end:
                        subscriptions.write({
                            subscriptions.removeAll(ofType: FlexibleSync_Team.self)
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 20)
    }

    func testRemoveAllSubscriptions() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                // Continue
                print("Successfully logged in to app")
                let user = app.currentUser
                var flexSyncConfig = user?.flexibleSyncConfiguration()
                flexSyncConfig?.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
                Realm.asyncOpen(configuration: flexSyncConfig!) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        // :code-block-start: remove-all-subscriptions
                        let subscriptions = realm.subscriptions
                        subscriptions.write({
                            subscriptions.removeAll()
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :code-block-end:
                        subscriptions.write({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testOpenFlexSyncRealm() async throws {
        // :code-block-start: flex-sync-open-realm
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)
        var config = user.flexibleSyncConfiguration()
        // Pass object types to the Flexible Sync configuration
        // as a temporary workaround for not being able to add complete schema
        // for a Flexible Sync app
        config.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
        let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
        // :code-block-end:
        print("Successfully opened realm: \(realm)")
        XCTAssertNotNil(realm)
        try await app.currentUser?.logOut()
    }
}

// :replace-end:
