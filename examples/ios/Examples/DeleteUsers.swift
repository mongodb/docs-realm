import XCTest
import RealmSwift

class DeleteUsers: XCTestCase {
    func testDeleteUserWithCompletion() {
        var syncUser: User?

        let loginExpectation = XCTestExpectation(description: "User created and logged in")
        // :code-block-start: closure-delete-user
        // Logging in using anonymous authentication creates a user object
        app.login(credentials: Credentials.anonymous) { [self] (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Assign the user object to a variable to demonstrate user deletion
                syncUser = user
                // :hide-start:
                loginExpectation.fulfill()
                // :hide-end:
            }
        }
        // :hide-start:
        wait(for: [loginExpectation], timeout: 10)
        // :hide-end:

        // Later, after the user is loggedd in we have a user,
        // and the total users in the app = 1
        XCTAssertNotNil(syncUser)
        XCTAssertEqual(app.allUsers.count, 1)

        // :hide-start:
        let deleteExpectation = XCTestExpectation(description: "User deleted")
        // :hide-end:
        // Call the `delete` method to delete the user
        syncUser!.delete { (error) in
            XCTAssertNil(error)
            // :hide-start:
            deleteExpectation.fulfill()
            // :hide-end:
        }
        // :hide-start:
        wait(for: [deleteExpectation], timeout: 10)
        // :hide-end:

        // When you delete the user, the SyncSession is destroyed and
        // there is no current user.
        XCTAssertNil(app.currentUser)
        // Now that we've deleted the user, the app has no users.
        XCTAssertEqual(app.allUsers.count, 0)
        // :code-block-end:
    }

    // :code-block-start: async-await-delete-user
    func testAsyncDeleteUser() async throws {
        // Logging in using anonymous authentication creates a user object
        let syncUser = try await app.login(credentials: Credentials.anonymous)
        // Now we have a user, and the total users in the app = 1
        XCTAssertNotNil(syncUser)
        XCTAssertEqual(app.allUsers.count, 1)
        // Call the `delete` method to delete the user
        try await syncUser.delete()
        // When you delete the user, the SyncSession is destroyed and
        // there is no current user.
        XCTAssertNil(app.currentUser)
        // Now that we've deleted the user, the app has no users.
        XCTAssertEqual(app.allUsers.count, 0)
    }
    // :code-block-end:
}
