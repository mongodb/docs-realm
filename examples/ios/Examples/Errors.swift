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
        // :code-block-start: create-error-handler
        let app = App(id: YOUR_REALM_APP_ID)
        app.syncManager.errorHandler = { error, session in
            // handle error
        }
        // :code-block-end:
    }

    func testClientReset() {
        // :code-block-start: client-reset
        func closeRealmSafely() {
            // invalidate all realms
        }

        func saveBackupRealmPath(_ path: String) {
            // restore the local changes from the backup file at the given path
        }

        let app = App(id: YOUR_REALM_APP_ID)
        app.syncManager.errorHandler = { error, session in
            guard let syncError = error as? SyncError else {
                fatalError("Unexpected error type passed to sync error handler! \(error)")
            }
            switch syncError.code {
            case .clientResetError:
                if let (path, clientResetToken) = syncError.clientResetInfo() {
                    closeRealmSafely()
                    saveBackupRealmPath(path)
                    SyncSession.immediatelyHandleError(clientResetToken, syncManager: app.syncManager)
                }
            default:
                // Handle other errors...
                ()
            }
        }
        // :code-block-end:
    }
}
