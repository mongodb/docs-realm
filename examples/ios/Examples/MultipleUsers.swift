import XCTest
import RealmSwift

class MultipleUsers: XCTestCase {

    override func tearDown() {
        let expectation = XCTestExpectation(description: "Remove anonymous user from device")
        app.currentUser()?.remove { (error) in
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 3)
    }

    func testLinkIdentities() {
        let expectation = XCTestExpectation(description: "Link user completes")
        
        // :code-block-start: link-identity 
        let app = App(id: YOUR_REALM_APP_ID)
        
        func logInAnonymously() {
            app.login(credentials: Credentials.anonymous()) { (user, error) in
                guard error == nil else {
                    print("Failed to log in: \(error!.localizedDescription)")
                    // :hide-start:
                    XCTAssert(false, "Failed to log in: \(error!.localizedDescription)")
                    // :hide-end:
                    return
                }

                // User uses app, then later registers an account
                registerNewAccount(anonymousUser: user!)
            }
        }
        
        func registerNewAccount(anonymousUser: User) {
            let email = "link@example.com"
            let password = "ganondorf"
            app.emailPasswordAuth().registerUser(email: email, password: password) { (error) in
                    guard error == nil else {
                        print("Failed to register new account: \(error!.localizedDescription)")
                        // :hide-start:
                        XCTAssert(false, "Failed to register new account: \(error!.localizedDescription)")
                        // :hide-end:
                        return
                    }

                    // Successfully created account, now link it
                    // with the existing anon user
                    link(user: anonymousUser, with: Credentials(email: email, password: password))     
            }
        
        }
        
        func link(user: User, with: Credentials) {
            user.linkUser(with: with) { (user, error) in
                guard error == nil else {
                    print("Failed to link user: \(error!.localizedDescription)")
                    // :hide-start:
                    XCTAssert(false, "Failed to link user: \(error!.localizedDescription)")
                    // :hide-end:
                    return
                }
                
                print("Successfully linked user: \(user!)")
                
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
        }
        
        logInAnonymously()
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
