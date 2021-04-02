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
        // :code-block-start: create-error-handler
        let app = App(id: YOUR_REALM_APP_ID)
        app.syncManager.errorHandler = { error, session in
            // handle error
        }
        // :code-block-end:
    }
}
