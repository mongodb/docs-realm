import XCTest
import RealmSwift

class Functions: AnonymouslyLoggedInTestCase {

    func testCallFunction() {
        let expectation = XCTestExpectation(description: "it completes")
        // :code-block-start: call-a-function
        let app = App(id: YOUR_REALM_APP_ID)
        
        // ... log in ...
        
        let user = app.currentUser!

        // The dynamic member name `sum` is directly associated with the function
        // name. The first argument is the `BSONArray` of arguments to be provided
        // to the function. The trailing closure is the completion handler
        // to call when the function call is complete. This handler is executed on
        // a non-main global `DispatchQueue`.
        user.functions.sum([1, 2]) { sum, error in
            guard error == nil else {
                print("Function call failed: \(error!.localizedDescription)")
                // :hide-start:
                XCTAssertEqual(error!.localizedDescription, "function not found: 'sum'")
                expectation.fulfill()
                // :hide-end:
                return
            }
            guard case let .double(value) = sum else {
                print("Unexpected non-double result: \(sum ?? "nil")");
                return
            }
            print("Called function 'sum' and got result: \(value)")
            assert(value == 3)
        }
        // :code-block-end:
        wait(for: [expectation], timeout: 10)
    }
}
