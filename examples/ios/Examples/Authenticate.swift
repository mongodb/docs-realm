import XCTest
import RealmSwift
import GoogleSignIn
import FacebookLogin
import SwiftUI

class Authenticate: XCTestCase {
    func testGoogleSignInWithServerAuthCode() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: google-with-serverAuthCode
        func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
            if let error = error {
              print("\(error.localizedDescription)")
                return
            }
            // Upon first successful sign-in, forward serverAuthCode credentials to MongoDB Realm.
            // Upon subsequent sign-ins, this returns nil.
            let credentials = Credentials.google(serverAuthCode: googleUser.serverAuthCode!)

            app.login(credentials: credentials) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .failure(let error):
                        print("Failed to log in to MongoDB Realm: \(error)")
                    case .success(let user):
                        print("Successfully logged in to MongoDB Realm using Google OAuth.")
                        // Now logged in, do something with user
                        // Remember to dispatch to main if you are doing anything on the UI thread
                    }
                }
            }
        }
        // :code-block-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testGoogleSignInWithId() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: google-with-googleId
        func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
            if let error = error {
              print("\(error.localizedDescription)")
                return
            }

            // Get the ID token for the authenticated user so you can pass it to Realm
            let idToken = googleUser.authentication.idToken!

            let credentials = Credentials.googleId(token: idToken)

            app.login(credentials: credentials) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .failure(let error):
                        print("Failed to log in to MongoDB Realm: \(error)")
                    case .success(let user):
                        print("Successfully logged in to MongoDB Realm using Google OAuth.")
                        // Now logged in, do something with user
                        // Remember to dispatch to main if you are doing anything on the UI thread
                    }
                }
            }
        }
        // :code-block-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testAppleCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: apple
        // Fetch IDToken via the Apple SDK
        let credentials = Credentials.apple(idToken: "<token>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testFacebookCredentials() {
        let expectation = XCTestExpectation(description: "login completes")
        // :code-block-start: facebook
        // This example demonstrates login logic for FBSDK version 13.x. If you're using
        // a different version of FBSDK, you'll need to adapt this example for your version.
        let loginManager = LoginManager()
        loginManager.logIn(permissions: [ .email ]) { loginResult in
            switch loginResult {
            case .success(let grantedPermissions, let declinedPermissions, let accessToken):
                let credentials = Credentials.facebook(accessToken: accessToken!.tokenString)
                app.login(credentials: credentials) { result in
                    DispatchQueue.main.async {
                        switch result {
                        case .failure(let error):
                            print("Failed to log in to MongoDB Realm: \(error)")
                        case .success(let user):
                            print("Successfully logged in to MongoDB Realm using Facebook OAuth.")
                            // Now logged in, do something with user
                            // Remember to dispatch to main if you are doing anything on the UI thread
                        }
                    }
                }
            case .failed(let error):
                print("Facebook login failed: \(error)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            case .cancelled:
                print("The user cancelled the login flow.")

            }
        }
        // :code-block-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testJwtCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: jwt
        let credentials = Credentials.jwt(token: "<jwt>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testCustomFunctionCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: function
        let params: Document = ["username": "bob"]

        app.login(credentials: Credentials.function(payload: params)) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
        // Delete this user so it doesn't interfere with the DeleteUsers tests
        app.currentUser?.delete()
    }

    func testApiKeyCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: api-key
        let credentials = Credentials.userAPIKey("<api-key>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testEmailPasswordCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: email-password
        let email = "skroob@example.com"
        let password = "12345"
        app.login(credentials: Credentials.emailPassword(email: email, password: password)) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testAsyncAwaitLogin() async {
        let expectation = XCTestExpectation(description: "login completes")
        // :code-block-start: async-await
        func login() async {
            do {
                let app = App(id: YOUR_REALM_APP_ID)
                // Authenticate with the instance of the app that points
                // to your backend. Here, we're using anonymous login.
                let user = try await app.login(credentials: Credentials.anonymous)
                print("Successfully logged in user: \(user)")
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            } catch {
                print("Failed to log in user: \(error.localizedDescription)")
            }
        }
        // :code-block-end:
        await login()
        wait(for: [expectation], timeout: 10)
    }

    func testAnonymousCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: anonymous
        let anonymousCredentials = Credentials.anonymous
        app.login(credentials: anonymousCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
                // :hide-start:
                expectation.fulfill()
                // :hide-end:
            }
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }

    func testReadUserMetadata() {
        let expectation = XCTestExpectation(description: "login completes")

        let anonymousCredentials = Credentials.anonymous
        app.login(credentials: anonymousCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // :code-block-start: read-user-metadata
                // First, log in a user. Then, access user metadata
                print("The logged-in user's email is: \(user.profile.email)")
                // :code-block-end:
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    override func tearDown() {
        guard app.currentUser != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "logout completes")
        // :code-block-start: logout
        app.currentUser?.logOut { (error) in
            // user is logged out or there was an error
            // :hide-start:
            expectation.fulfill()
            // :hide-end:
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
