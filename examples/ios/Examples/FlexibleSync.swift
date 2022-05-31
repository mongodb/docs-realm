// :replace-start: {
//   "terms": {
//     "FlexibleSync_": ""
//   }
// }

let APPID = "swift-flexible-vkljj"

import XCTest
import RealmSwift

// :snippet-start: flexible-sync-models
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
// :snippet-end:

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
                        // :snippet-start: add-single-subscription
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
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
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: add-multiple-subscriptions
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
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
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: add-subscription-with-oncomplete
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
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
                         // :snippet-end:
                        subscriptions.update({
                            subscriptions.append(
                                // :snippet-start: query-subscription-by-name
                                QuerySubscription<FlexibleSync_Task>(name: "long-running-completed") {
                                    $0.completed == true && $0.progressMinutes > 120
                                }
                                // :snippet-end:
                            )
                            subscriptions.append(
                                // :snippet-start: query-subscription-without-name
                                QuerySubscription<FlexibleSync_Team> {
                                   $0.teamName == "Developer Education"
                                }
                                // :snippet-end:
                            )
                        }, onComplete: { error in // error is optional
                            if error == nil {
                               // Flexible Sync has updated data to match the subscription
                            } else {
                               // Handle the error
                            }
                         })
                        subscriptions.update({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testSubscribeToAllObjectsOfAType() {
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
                        // :snippet-start: subscribe-to-all-objects-of-a-type
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
                            subscriptions.append(QuerySubscription<FlexibleSync_Team>(name: "all_teams"))
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :snippet-end:
                        subscriptions.update({
                            subscriptions.removeAll()
                        })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 30)
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
                        // :snippet-start: update-subscription
                        let subscriptions = realm.subscriptions
                        // :remove-start:
                        // Add subscription to update
                        subscriptions.update({
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
                        // :remove-end:
                        let foundSubscription = subscriptions.first(ofType: FlexibleSync_Team.self, where: {
                              $0.teamName == "Developer Education"
                        })
                        subscriptions.update({
                            foundSubscription?.updateQuery(toType: FlexibleSync_Team.self, where: {
                                 $0.teamName == "Documentation"
                            })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: update-subscription-by-name
                        let subscriptions = realm.subscriptions
                        // :remove-start:
                        // Add subscription to update
                        subscriptions.update({
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
                        // :remove-end:
                        let foundSubscription = subscriptions.first(named: "user-team")
                        subscriptions.update({
                            foundSubscription?.updateQuery(toType: FlexibleSync_Team.self, where: {
                                 $0.teamName == "Documentation"
                            })
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: remove-single-subscription
                        let subscriptions = realm.subscriptions
                        // :remove-start:
                        // Add subscriptions to remove
                        subscriptions.update {
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "docs-team") {
                                    $0.teamName == "Documentation"
                                })
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "existing-subscription") {
                                    $0.teamName == "Engineering"
                                })
                        }
                        // :remove-end:
                        // Look for a specific subscription, and then remove it
                        let foundSubscription = subscriptions.first(named: "docs-team")
                        subscriptions.update({
                            subscriptions.remove(foundSubscription!)
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })

                        // Or remove a subscription that you know exists without querying for it
                        subscriptions.update {
                            subscriptions.remove(named: "existing-subscription")
                        }
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: remove-subscriptions-to-object-type
                        let subscriptions = realm.subscriptions
                        // :remove-start:
                        // Add subscriptions to remove
                        subscriptions.update {
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "documentation-team") {
                                    $0.teamName == "Documentation"
                                })
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Team>(name: "another-subscription") {
                                    $0.teamName == "Engineering"
                                })
                        }
                        // :remove-end:
                        subscriptions.update({
                            subscriptions.removeAll(ofType: FlexibleSync_Team.self)
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :snippet-end:
                        subscriptions.update({
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
                        // :snippet-start: remove-all-subscriptions
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
                            subscriptions.removeAll()
                        }, onComplete: { error in // error is optional
                            if error == nil {
                              // Flexible Sync has updated data to match the subscription
                            } else {
                              // Handle the error
                            }
                        })
                        // :snippet-end:
                        subscriptions.update({
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
        // :snippet-start: flex-sync-open-realm
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)
        var config = user.flexibleSyncConfiguration()
        // Pass object types to the Flexible Sync configuration
        // as a temporary workaround for not being able to add complete schema
        // for a Flexible Sync app
        config.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
        let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
        // :snippet-end:
        print("Successfully opened realm: \(realm)")
        XCTAssertNotNil(realm)
        try await app.currentUser?.logOut()
    }
}

// :replace-end:
