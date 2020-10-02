//
//  Authenticate.swift
//  RealmExamples
//
//  Created by Chris Bush on 2020-10-01.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

import XCTest
import RealmSwift

class Authenticate: XCTestCase {
    func testGoogleCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: google
        // Fetch Google token via the Google SDK
        let credentials = Credentials(googleAuthCode: "<token>")
        app.login(credentials: credentials) { (user, error) in
           DispatchQueue.main.sync {
               guard error == nil else {
                   print("Login failed: \(error!)")
                   // :hide-start:
                   expectation.fulfill()
                   // :hide-end:
                   return
               }
               
               // Now logged in, do something with user
           }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }

    func testAppleCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: apple
        // Fetch Apple token via the Apple SDK
        let credentials = Credentials(appleToken: "<token>")
        app.login(credentials: credentials) { (user, error) in
           DispatchQueue.main.sync {
               guard error == nil else {
                   print("Login failed: \(error!)")
                   // :hide-start:
                   expectation.fulfill()
                   // :hide-end:
                   return
               }
               
               // Now logged in, do something with user
           }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }
    
    func testFacebookCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: facebook
        // Fetch Facebook token via the Facebook SDK
        let credentials = Credentials(facebookToken: "<token>")
        app.login(credentials: credentials) { (user, error) in
           DispatchQueue.main.sync {
               guard error == nil else {
                   print("Login failed: \(error!)")
                   // :hide-start:
                   expectation.fulfill()
                   // :hide-end:
                   return
               }
               
               // Now logged in, do something with user
           }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }

    func testJwtCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: jwt
        let credentials = Credentials(jwt: "<jwt>")
        app.login(credentials: credentials) { (user, error) in
           DispatchQueue.main.sync {
               guard error == nil else {
                   print("Login failed: \(error!)")
                   // :hide-start:
                   expectation.fulfill()
                   // :hide-end:
                   return
               }
               
               // Now logged in, do something with user
           }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }

    func testCustomFunctionCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: function
        let params = [
           "username": "bob"
        ]
              
        var e: NSError?
          
        app.login(credentials: Credentials(functionPayload: params, error: &e)) { (user, error) in
           DispatchQueue.main.sync {
               guard error == nil else {
                   print("Login failed: \(error!)")
                   // :hide-start:
                   expectation.fulfill()
                   // :hide-end:
                   return
               }
               // Now logged in, do something with user
           }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }
    
    func testApiKeyCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: api-key
        let credentials = Credentials(userAPIKey: "<api-key>")
        app.login(credentials: credentials) { (user, error) in
          DispatchQueue.main.sync {
              guard error == nil else {
                  print("Login failed: \(error!)")
                  // :hide-start:
                  expectation.fulfill()
                  // :hide-end:
                  return
              }
              
              // Now logged in, do something with user
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
        app.login(credentials: Credentials(email: email, password: password)) { (user, error) in
          DispatchQueue.main.sync {
              guard error == nil else {
                  print("Login failed: \(error!)")
                  // :hide-start:
                  expectation.fulfill()
                  // :hide-end:
                  return
              }
              
              // Now logged in, do something with user
          }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }
    
    func testAnonymousCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :code-block-start: anonymous
        let anonymousCredentials = Credentials.anonymous()
        app.login(credentials: anonymousCredentials) { (user, error) in
          DispatchQueue.main.sync {
              guard error == nil else {
                  print("Login failed: \(error!)")
                  return
              }
              
              // Now logged in, do something with user
              // :hide-start:
              expectation.fulfill()
              // :hide-end:
          }
        }
        // :code-block-end: 
        wait(for: [expectation], timeout: 10)
    }
    
    override func tearDown() {
        guard app.currentUser() != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "logout completes")
        // :code-block-start: logout
        app.currentUser()?.logOut { (error) in
            // user is logged out or there was an error
            // :hide-start:
            expectation.fulfill()
            // :hide-end:
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
