import XCTest
import RealmSwift

class ManageEmailPasswordUsers: XCTestCase {

    func testRegisterNewAccount() {
        let expectation = XCTestExpectation(description: "Registration continues")
        
        // :code-block-start: register-email
        let app = App(id: YOUR_REALM_APP_ID)
        let client = app.emailPasswordAuth
        let email = "skroob@example.com"
        let password = "password12345"
        client.registerUser(email: email, password: password) { (error) in
            guard error == nil else {
                print("Failed to register: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "name already in use")
                expectation.fulfill()
                // :hide-end:
                return
            }
            // Registering just registers. You can now log in.
            print("Successfully registered user.")
            // :hide-start:
            expectation.fulfill()
            // :hide-end:            
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
    
    func testConfirmNewUserEmail() {
        let expectation = XCTestExpectation(description: "Confirmation continues")
        // :code-block-start: confirm-new-user-email 
        let app = App(id: YOUR_REALM_APP_ID)
        let client = app.emailPasswordAuth

        // Token and tokenId are query parameters in the confirmation
        // link sent in the confirmation email.
        let token = "someToken"
        let tokenId = "someTokenId"
        client.confirmUser(token, tokenId: tokenId) { (error) in
            guard error == nil else {
                print("User confirmation failed: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "invalid token data")
                expectation.fulfill()
                // :hide-end:
                return
            }
            // User email address confirmed.
            print("Successfully confirmed user.")
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
    
    func testResetPassword() {
        var expectation = XCTestExpectation()
        // :code-block-start: reset-password
        let app = App(id: YOUR_REALM_APP_ID)
        let client = app.emailPasswordAuth

        let email = "forgot.my.password@example.com"
        // If Realm app password reset mode is "Send a password reset email",
        // we can do so here:
        client.sendResetPasswordEmail(email, completion: {(error) in
            guard error == nil else {
                print("Reset password email not sent: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "user not found")
                expectation.fulfill()
                // :hide-end:
                return
            }
            print("Password reset email sent.")
        })
        // :hide-start:
        wait(for: [expectation], timeout: 10)
        expectation = XCTestExpectation()
        // :hide-end:

        // Later...

        let newPassword = "mynewpassword12345"

        // Token and tokenId are query parameters in the reset password
        // link sent in the reset password email.
        let token = "someToken"
        let tokenId = "someTokenId"
        client.resetPassword(to: newPassword, token: token, tokenId: tokenId) { (error) in
            guard error == nil else {
                print("Failed to reset password: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "invalid token data")
                expectation.fulfill()
                // :hide-end:
                return
            }
            // Password reset successful.
            print("Password reset successful.")
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
