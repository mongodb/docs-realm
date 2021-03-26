//
//  HandleErrors.swift
//  Pods
//
//  Created by Mohammad Chughtai on 3/26/21.
//

import XCTest
import RealmSwift

class HandleErrors: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testErrorHandlerMethod() {
        let expectation = XCTestExpectation(description: "it completes")
        let app = App(id: YOUR_REALM_APP_ID)
        let user = app.currentUser
        let partitionValue = "some partition value"
        let configuration = user!.configuration(partitionValue: partitionValue)
        _ = try! Realm(configuration: configuration)

        // :code-block-start: create-error-handler
        app.syncManager.errorHandler = { error, session in
            // handle error
        }
        // :code-block-end:

        expectation.fulfill()
    }
}
