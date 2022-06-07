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

    func testClientReset() {
        // :snippet-start: client-reset
        func closeRealmSafely() {
            // invalidate all realms
        }

        func saveBackupRealmPath(_ path: String) {
            // restore the local changes from the backup file at the given path
        }

        let app = App(id: YOUR_APP_SERVICES_APP_ID)
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
        // :snippet-end:
    }
}
