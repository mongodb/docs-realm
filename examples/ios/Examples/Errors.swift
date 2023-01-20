import XCTest
import RealmSwift

class Errors: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testErrorHandlerMethodObjc() {
        // :snippet-start: create-error-handler
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        app.syncManager.errorHandler = { error, session in
            // handle error
        }
        // :snippet-end:
    }
}
